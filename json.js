const obj =  `[
    {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    },
    {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
    },
    {
        "userId": 1,
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
    }]`

    const jsonData = JSON.parse(obj);


    console.log(jsonData);

    localStorage.setItem('JsonFile', JSON.stringify(jsonData))

    let fetchedData = JSON.parse(localStorage.getItem('JsonFile'))

    console.log(fetchedData);