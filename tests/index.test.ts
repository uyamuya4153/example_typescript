import { extractParticipantNumbers } from '../src/index';
import path from 'path';

test('extracts participant numbers correctly', () => {
  const filePath = path.resolve(
    __dirname,
    '../パークゴルフ場利用申請書_中島体育部.xlsx'
  );
  const result = extractParticipantNumbers(filePath);
  expect(result.adultCount).toBe(30); // 期待される大人の人数に置き換えてください
  expect(result.childCount).toBe(0); // 期待される子供の人数に置き換えてください
});
