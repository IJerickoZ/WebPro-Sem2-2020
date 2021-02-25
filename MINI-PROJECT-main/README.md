# TODO List App

### 1. ทำการสร้างหน้าเวบ My ToDo List โดยใช้ HTML และ Bulma CSS และ Vue JS ดังรูป
- รายการ Task เป็น Checkbox และเมื่อติ้ก Checkbox จะเปลี่ยนสถานะของ Task เป็น "Completed" และขีดฆ่าชื่อ Task นั้น
```
style="text-decoration: line-through;"
```
- สามารถเพิ่มรายการใหม่เข้าไปได้โดยการพิมพ์ชื่อ Task ใน Textbox "Task Name" ด้านล่าง แล้วกดปุ่ม "Save"
- โดย Default เมื่อสร้าง Task ขึ้นใหม่จะมีสถานะ "Incomplete" เสมอ

![ToDo1](https://github.com/bundit-it/MINI-PROJECT/blob/main/todo1.png)

### 2. เพิ่มปุ่ม icon รูปดินสอ เมื่อกดแล้วให้มี [Modal](https://bulma.io/documentation/components/modal/) เปิดขึ้นมาสำหรับแก้ไขดังรูป
- หน้า Modal มีส่วนประกอบดังนี้
  1. ช่อง Textbox สำหรับแก้ไขชื่อ Task
  2. ปุ่ม "Save" เมื่อกดจะทำการบันทึกการแก้ไข

![ToDo2](https://github.com/bundit-it/MINI-PROJECT/blob/main/todo2.png)

### 3. เพิ่มปุ่ม icon รูปถังขยะ สำหรับลบรายการ Task นั้น ๆ เมื่อกดแล้วให้มี [Modal](https://bulma.io/documentation/components/modal/) เปิดขึ้นมาสำหรับยืนยันการลบดังรูป

![ToDo3](https://github.com/bundit-it/MINI-PROJECT/blob/main/todo3.png)

### 4. ด้านบนของรายการ ToDo ให้แสดงผลการนับจำนวน Task ที่มีสถานะ Completed และ Incomplete ดังรูป
***จะต้องใช้ Computed Properties เท่านั้น***

![ToDo4](https://github.com/bundit-it/MINI-PROJECT/blob/main/todo4.png)

### 5. เพิ่ม Filters สำหรับการกรองรายการ Task โดยสามารถกรองได้ดังนี้
- "Hide completed tasks" เป็น Checkbox คือเมื่อติ้กจะทำการ**ซ่อน** Task ที่มีสถานะ "Complete"
- "Sort incomplete tasks" เป็น Checkbox คือเมื่อติ้กจะทำเรียงลำดับ (Sort) รายการ Task โดยเอารายการที่มีสถานะ "Incomplete" ขึ้นไว้ด้านบน ในกรณีที่ไม่ติ้กจะ Sort ด้วยชื่อของ Task

![ToDo5](https://github.com/bundit-it/MINI-PROJECT/blob/main/todo5.png)


# ToDo List App 2.0
### 1. เพิ่มรายละเอียดสำหรับ Task โดยเพิ่ม field ข้อมูลดังนี้:
- Due date เป็น date picker ✔️
  - เพื่อเลือกกำหนดวันเสร็จงาน ✔️
  - แสดงผลใน ToDo list เป็น (due by yyyy-mm-dd) ✔️
- Flag เป็น checkbox ✔️
  - เพื่อระบุว่า task นี้เป็นงานสำคัญ ✔️
  - แสดงผลใน ToDo list เป็น icon รูปธงตามหลังชื่อ task ดังรูป ✔️
- Color เป็นปุ่ม icon 3 ปุ่ม ✔️
  - เพื่อเลือกสีของ task โดยจะมีให้เลือก 3 สีได้แก่ ดำ (เลือกโดย default) แดง เขียว ✔️
  - แสดงผลสีของชื่อ task ตามกำหนด ✔️

#### แก้ไข 2 ส่วนหลัก ๆ ได้แแก่ 
1. Form - add task (5 คะแนน) ✔️
  - มีการ validate ดังนี้
    - ชื่อ task ห้ามเป็นค่าว่าง ✔️
    - วันที่จะต้องเป็น format "yyyy-mm-dd" (เป็นค่าว่างได้) ✔️
    - ต้องเลือก icon สี ได้ 1 สีเท่านั้น จะไม่เลือกไม่ได้ หรือ เลือกมากกว่า 1 สีไม่ได้ ✔️
2. Modal - edit task (3 คะแนน)✔️
  - มีการ validate ดังนี้
    - ชื่อ task ห้ามเป็นค่าว่าง ✔️
    - วันที่จะต้องเป็น format "yyyy-mm-dd" (เป็นค่าว่างได้) ✔️
    - ต้องเลือก icon สี ได้ 1 สีเท่านั้น จะไม่เลือกไม่ได้ หรือ เลือกมากกว่า 1 สีไม่ได้ ✔️

![TODO 2-1](https://github.com/it-web-pro/MINI-PROJECT-2/blob/main/TODO%202-1.png)

### 2. เพิ่ม filters สำหรับการกรองรายการ task โดยสามารถกรองได้ดังนี้
- "Hide completed tasks" เป็น checkbox เมื่อติ้กจะทำการซ่อน task ที่มีสถานะ "Complete" (1 คะแนน) ✔️
- "Show only flagged tasks" เป็น checkbox เมื่อติ้กจะทำการซ่อน task ที่ไม่มี Flag (1 คะแนน) ✔️

### 3. เพิ่มการ sort สำหรับเรียงลำดับ task โดยสามารถเรียงลำดับได้ดังนี้ 
- "Sort alphabetically" เป็น radio - เรียงลำดับ task ตามลำดับตัวอักษร (เลือกโดย default) (1 คะแนน) ✔️
- "Sort incomplete tasks" เป็น radio - เรียงลำดับ task โดยเอารายการที่มีสถานะ "Incomplete" ขึ้นไว้ด้านบน (1 คะแนน) ✔️
- "Sort flagged task first" เป็น radio - เรียงลำดับ task โดยเอารายการที่มี "Flag" ขึ้นไว้ด้านบน (1 คะแนน) ✔️
- "Sort by due date (ascending)" radio - เรียงลำดับ task ตามวัน due date โดยเอารายการที่วัน due date ถึงก่อนไว้ด้านบน (1 คะแนน) ✔️

![TODO 2-2](https://github.com/it-web-pro/MINI-PROJECT-2/blob/main/TODO%202-2.png)

### 4. ปรับให้สามารถเพิ่มมากกว่า 1 ToDo list ได้ โดยจะต้องปรับเพิ่มดังต่อไปนี้
- เพิ่มปุ่ม + ด้านบนของหน้า เมื่อกดจะแสดง modal สำหรับสร้าง list ใหม่ได้ (2 คะแนน) ✔️
  - มีการ validate ชื่อ task ห้ามเป็นค่าว่าง ✔️
- สามารถแก้ไขชื่อ list (2 คะแนน) ✔️
  - มีการ validate ชื่อ task ห้ามเป็นค่าว่าง ✔️
- สามารถลบ list ได้ (1 คะแนน) ✔️
- การเพิ่มและแก้ไข task สามารถเลือก list ที่ task นั้นอยู่ได้ (1 คะแนน) ✔️

**กำหนดให้ data ของ รายการ todo list เป็นในรูปแบบด้านล่าง**
```
todoLists: [
      { id: 1, name: "ToDo List" },
      { id: 2, name: "Not ToDo List" },
    ],
tasks: [
      { id: 1, name: "Go shopping", isComplete: false, listId: 1 },
      { id: 2, name: "Doing chores", isComplete: false, listId: 1 },
      { id: 3, name: "Doing homework", isComplete: false, listId: 1 },
      { id: 4, name: "Coding program", isComplete: false, listId: 1 },
      { id: 5, name: "Work too hard", isComplete: false, listId: 2 },
      { id: 6, name: "Play harder", isComplete: false, listId: 2 },
    ],
```

![TODO 2-3](https://github.com/it-web-pro/MINI-PROJECT-2/blob/main/TODO%202-3.png)

### 5. เพิ่ม filters และ sorts สำหรับการกรองและเรียงลำดับรายการ task ในแต่ละ list โดยสามารถกรองและเรียงลำดับได้ ตามคำสั่งในข้อ 2-3
**_หมายเหตุ: กรอง และ เรียงลำดับ แยกแต่ละ ToDo list_**
- Filter รายการ task แยกแต่ละ list (5 คะแนน)
- Sort รายการ task แยกแต่ละ list (5 คะแนน)

![TODO 2-4](https://github.com/it-web-pro/MINI-PROJECT-2/blob/main/TODO%202-4.png)



