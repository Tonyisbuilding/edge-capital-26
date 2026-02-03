/**
 * EdgeFund Returns CMS - Google Apps Script
 * 
 * Deploy this as a Web App (Anyone can access) to enable
 * GET requests from the website.
 * 
 * SETUP:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Replace Code.gs contents with this file
 * 4. Click Deploy → New deployment
 * 5. Select "Web app" as type
 * 6. Set "Who has access" to "Anyone"
 * 7. Copy the Web App URL
 */

// Whitelisted tabs only - prevents accidental exposure
const ALLOWED_TABS = ['EC_Class I', 'EC_Class II', 'EC_Class III'];

// Column mapping (0-indexed)
const COLUMNS = {
    MONTH_NL: 0,
    MONTH_EN: 1,
    MONTHLY_RETURN: 2,
    YTD: 3,
    SINCE_INCEPTION: 4,
    CAGR: 5,
    PUBLISH: 6,
    MONTH_KEY: 7
};

// Columns to sync across all tabs (1-indexed for Sheet API)
const SYNC_COLUMNS = [1, 2, 8]; // Month_NL (A), Month_EN (B), Month_Key (H)

/**
 * Trigger: Auto-syncs month columns across all tabs when edited
 * When you edit Month_NL, Month_EN, or Month_Key in one tab,
 * it copies that value to the same row in other tabs.
 */
function onEdit(e) {
    const sheet = e.source.getActiveSheet();
    const sheetName = sheet.getName();
    const range = e.range;
    const row = range.getRow();
    const col = range.getColumn();

    // Only sync if:
    // 1. Edit is in an allowed tab
    // 2. Edit is in a sync column
    // 3. Edit is not in header row
    if (!ALLOWED_TABS.includes(sheetName)) return;
    if (!SYNC_COLUMNS.includes(col)) return;
    if (row === 1) return;

    const newValue = e.value;
    const ss = e.source;

    // Sync to other tabs
    for (const tabName of ALLOWED_TABS) {
        if (tabName === sheetName) continue; // Skip source tab

        const targetSheet = ss.getSheetByName(tabName);
        if (!targetSheet) continue;

        // Set the same value in the same row/column
        targetSheet.getRange(row, col).setValue(newValue);
    }
}

/**
 * Handles GET requests from the website
 */
function doGet(e) {
    try {
        const result = getFundReturns();
        return ContentService
            .createTextOutput(JSON.stringify(result))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ error: error.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Gets the latest published row for each whitelisted fund class
 */
function getFundReturns() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const result = {};

    for (const tabName of ALLOWED_TABS) {
        const sheet = ss.getSheetByName(tabName);
        if (!sheet) {
            result[normalizeTabName(tabName)] = null;
            continue;
        }

        const latestPublished = getLatestPublishedRow(sheet);
        result[normalizeTabName(tabName)] = latestPublished;
    }

    return result;
}

/**
 * Gets the latest published row from a sheet
 * Returns null if no published rows exist
 */
function getLatestPublishedRow(sheet) {
    const data = sheet.getDataRange().getValues();

    // Skip header row, filter published rows
    const publishedRows = [];
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const isPublished = row[COLUMNS.PUBLISH] === true;
        const monthKey = row[COLUMNS.MONTH_KEY];

        if (isPublished && monthKey) {
            publishedRows.push({
                row: row,
                monthKey: String(monthKey)
            });
        }
    }

    if (publishedRows.length === 0) {
        return null;
    }

    // Sort by monthKey descending to get latest
    publishedRows.sort((a, b) => b.monthKey.localeCompare(a.monthKey));

    const latest = publishedRows[0].row;

    return formatRow(latest);
}

/**
 * Formats a row into the normalized JSON structure
 */
function formatRow(row) {
    return {
        month: {
            nl: formatMonthValue(row[COLUMNS.MONTH_NL], 'nl'),
            en: formatMonthValue(row[COLUMNS.MONTH_EN], 'en'),
            key: formatMonthKey(row[COLUMNS.MONTH_KEY])
        },
        returns: {
            monthly: parsePercentage(row[COLUMNS.MONTHLY_RETURN]),
            ytd: parsePercentage(row[COLUMNS.YTD]),
            since_inception: parsePercentage(row[COLUMNS.SINCE_INCEPTION]),
            cagr: parsePercentage(row[COLUMNS.CAGR])
        }
    };
}

/**
 * Formats month value - handles both strings and Date objects
 */
function formatMonthValue(value, lang) {
    if (!value) return '';

    // If it's a Date object, format it
    if (value instanceof Date) {
        const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        const monthsNL = ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
            'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
        const months = lang === 'nl' ? monthsNL : monthsEN;
        const month = months[value.getMonth()];
        const year = value.getFullYear();
        return `${month} ${year}`;
    }

    return String(value);
}

/**
 * Formats month key - handles both strings and Date objects
 * Returns format: "2026-01"
 */
function formatMonthKey(value) {
    if (!value) return '';

    // If it's a Date object, format as YYYY-MM
    if (value instanceof Date) {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    }

    return String(value);
}

/**
 * Parses percentage value (handles "1,47%" or "1.47%" or 0.0147)
 */
function parsePercentage(value) {
    if (typeof value === 'number') {
        // If it's a decimal like 0.0147, convert to percentage
        return value < 1 && value > -1 ? Math.round(value * 10000) / 100 : Math.round(value * 100) / 100;
    }

    if (typeof value === 'string') {
        // Remove % sign and convert comma to dot
        const cleaned = value.replace('%', '').replace(',', '.').trim();
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? 0 : Math.round(parsed * 100) / 100;
    }

    return 0;
}

/**
 * Normalizes tab name for JSON key (spaces to underscores)
 */
function normalizeTabName(tabName) {
    return tabName.replace(/ /g, '_');
}

/**
 * Test function - run this to verify the script works
 */
function testGetFundReturns() {
    const result = getFundReturns();
    Logger.log(JSON.stringify(result, null, 2));
}
