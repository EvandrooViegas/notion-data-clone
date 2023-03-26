A View can have multiple Properties ex: 

const view:View = {
    name: "Tasks",    
    status: [{ id: 1, name: "Process", type: "status", values: [{ id: 1, text: "Not Started" }, { id: 2, text: "In Process" }] }],
    select: [{ id: 1, name: "Difficulty", type: "select", values: [{ id: 1, text: "Hard", color: "red" }, { id: 2, text: "Medium", color: "orange" }, { id: 3, text: "Easy", color: "green" }] }],
    properties: [{ id: 1, name: "Process" type: "status" }, { id: 1, name: "Difficulty" type: "select" },]
    data: [
        {
            id: 1,
            properties: ["status", "text", "number", "select"],
            value: [   
                { id: 4, value: 15, type: "number" },    
                { id: 3, value: "Study", type: "text" },    
                { id: 1, value: "In Process", ref: [{ statusId: 1, valueId: 2  }], type: "status" },    
                { id: 5, value: "Hard", type: "select", ref: { selectId: 1, valueId: 1 }}
            ]
        },   
    ]
}