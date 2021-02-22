function convertADtoBE(input) {
    // AD คือคริสดศักราย
    // BE คือพุทธศักราช
    //
    // TODO: แปลงปีใน คริสตศักราช เป็น พุทธศักราช เช่น 2000 เป็น "พ.ศ. 2543"
    // โดยให้เติมตัวอักษร พ.ศ. เข้าไปด้านหน้าด้วย
    if (typeof(input) === 'number' && input >= 0) {
        return `พ.ศ. ${input+543}`;
    } else {
        return 'ไม่ถูกต้อง';
    }
}

function evenOrOdd(input) {
    // TODO: ให้ตรวจสอบว่าตัวเลข input เป็นเลขคู่หรือเลขคี่
    if (input % 2 === 0) {
        return 'even';
    } else {
        return 'odd';
    }
}

function getFullName(input) {
    // TODO: ให้นำคำนำหน้าชื่อ ชื่อต้น นามสกุล มาต่อกัน
    if (input.sex === 'male') {
        return `Mr. ${input.firstName} ${input.lastName}`;
    } else {
        return `Ms. ${input.firstName} ${input.lastName}`;
    }
}

function getFirstName(input) {
    // TODO: ให้ทำการตัดนามสกุลออกโดยใช้ indexOf() และ substring()
    let space = input.indexOf(" ");
    let name = input.substring(0, space);
    return name;
}

function splitName(input) {
    // TODO: ให้ทำการแยก ชื่อต้นกับนามสกุล
    let test = input.split(" ")
    let ans = new Object()
    ans['firstName'] = test[0];
    ans['lastName'] = test[1];
    ans['count'] = test[0].length
    return ans
}