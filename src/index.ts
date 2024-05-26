import xlsx from 'xlsx';

interface ParticipantNumbers {
  adultCount: number;
  childCount: number;
}

export function extractParticipantNumbers(filePath: string): ParticipantNumbers {
  // Load the Excel file
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
  const sheet = workbook.Sheets[sheetName];

  // Convert the sheet to JSON
  const jsonData: (string | number)[][] = xlsx.utils.sheet_to_json(sheet, {
    header: 1,
  }) as (string | number)[][];

  // Initialize counts
  let adultCount = 0;
  let childCount = 0;

  // Find the row containing "使用人数"
  for (let i = 0; i < jsonData.length; i++) {
    const row = jsonData[i];
    if (row.includes('使用人数')) {
      // Find the column containing "大人" and "小人"
      for (let j = 0; j < row.length; j++) {
        if (row[j] === '大人') {
          const value = jsonData[i][j + 1];
          adultCount = Number.isFinite(Number(value)) ? Number(value) : 0;
        } else if (row[j] === '小人') {
          const value = jsonData[i][j + 1];
          childCount = Number.isFinite(Number(value)) ? Number(value) : 0;
        }
      }
      break;
    }
  }

  return { adultCount, childCount };
}

// Usage
const filePath = './パークゴルフ場利用申請書_中島体育部.xlsx';
const { adultCount, childCount } = extractParticipantNumbers(filePath);
console.log(`大人の参加人数: ${adultCount}人`);
console.log(`子供の参加人数: ${childCount}人`);
