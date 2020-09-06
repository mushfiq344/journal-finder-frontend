import React, { useState, useEffect } from "react";

import '../../../css/movie-server.css';




import { DataTableHooks } from "./dataTable/dataTableHooks"
export default function JournalList(props) {

    // columns
    const columns = [
        {
            name: "ID",
            selector: "id",
            sortable: true,
        },
        {
            name: "Title",
            selector: "title",
            sortable: true,
        },
        {
            name: "categories",
            selector: "categories",
            sortable: true,
            right: true,
        },
    ];

    // table name
    const tableName = "Journals";
    // edit path
    const viewPath = "/journals/";

    // delete row
    const deleteRowFromDb = (id) => {
        console.log("delete this using Api:", id);
    };

    // populate table
    const PopulateTable = (items) => {
        // fetch api here
        const data = [];
        for (let i = 0; i < items.length; i++) {
            let row = {}
            console.log(items[i])
            row.id = items[i].id
            row.title = items[i].title
            let category = "";
            for (let j = 0; j < items[i].categories.length; j++) {
                category += items[i].categories[j].name + ','
            }
            row.categories = category
            data.push(row)
        }
        setRows(data)
    };
    const [url, setUrl] = useState(props.data.remoteServer + "movies");
    const [token, setToken] = useState(true);
    const [rows, setRows] = useState([]);
    // hooks for paginated data
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // hooks for paginations
    const [first_page_url, setFirst_page_url] = useState(null);
    const [last_page_url, setLast_page_url] = useState(null);

    const [prev_page_url, setPrev_page_url] = useState(null);
    const [next_page_url, setNext_page_url] = useState(null);

    const [current_page, setCurrent_page] = useState(null);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        let bearer = 'Bearer ' + props.data.token;
        fetch(props.data.remoteServer + 'journal', {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result at journal list:", result);

                    PopulateTable(result)

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError("error:", error);
                }
            )
    }, [url])
    console.log("rows....", rows)
    return (

        token === true ?
            <div>

                <DataTableHooks
                    tableName={tableName}
                    viewPath={viewPath}
                    columns={columns}
                    data={rows}
                    deleteRowFromDb={deleteRowFromDb}></DataTableHooks>


            </div > : props.data.logOut()



    );



}
