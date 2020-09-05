import React, { useState, useEffect } from 'react';

import Select from 'react-select';

const GenreSelect = (props) => {

    const [options, setOptions] = useState([])
    const newGenre = (e) => {
        console.log('new genres', e)
        props.handleGenres(e);
    }

    useEffect(() => {
        let bearer = 'Bearer ' + props.data.token;
        fetch(props.data.remoteServer + 'genres', {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let genreList = []
                    result.data.forEach(element => {
                        let obj = {
                            'value': element.id,
                            'label': element.name
                        }
                        genreList.push(obj)
                    });
                    setOptions(genreList)



                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {

                }
            )
    }, [])

    return (

        < Select
            onChange={(e) => newGenre(e)}
            isMulti
            value={props.genres}
            name="genre"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            isClearable={true}
            required />

    )
};

export { GenreSelect };