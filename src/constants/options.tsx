export const AI_PROMPT = `האם יש מידע כלשהו על נגישות לנכים עבור המקום הבא: 
שם העסק: {name}
כתובת: {address}

אם כן, פרט את כל המידע הידוע על נגישות עבור אנשים עם מוגבלויות פיזיות – כמו:
- כניסה נגישה (כיסא גלגלים, רמפה וכו')
- שירותים נגישים
- חניות נכים
- מעליות נגישות
- שילוט מונגש
- כל פרט רלוונטי אחר

השב בעברית בתור אובייקט JSON בפורמט הבא:

{
  "businessName": "שם העסק",
  "address": "כתובת מלאה",
  "isWheelchairAccessible": true | false,
  "hasAccessibleRestrooms": true | false,
  "hasAccessibleParking": true | false,
  "hasElevator": true | false,
  "hasBrailleSigns": true | false,
  "comments": "הערות כלליות על הנגישות (אם יש)"
}
`;
