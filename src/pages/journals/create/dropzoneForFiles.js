import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const deleteBtn = {
    color: "red"
}
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


function MyDropzone(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        // incase of images, use this  accept: 'image/*',
        accept: '.pdf',
        onDrop: async acceptedFiles => {


            props.getImage(acceptedFiles);
        }
    });

    const removeOne = (event, index) => {

        event.preventDefault();
        console.log(index)
        props.removeFile(index)
    };
    console.log("at file dropzone", props.files)
    const thumbs = props.files.map((file, index) =>

        <div className={"col-12"} key={index}>

            <span>{file[0].name}</span> <button id={index} className={"btn btn-link"} onClick={(event) => removeOne(event, index)}><i style={deleteBtn} className="fa fa-times" aria-hidden="true"></i></button>

        </div >
        // incase of image just use this
        // <div style={thumb} key={index}>
        //     <div style={thumbInner}>
        //         <img
        //             src={file[0].preview}
        //             style={img}
        //         />
        //         <button id={index} className={"btn btn-danger"} onClick={(event) => removeOne(event, index)}><i className="fa fa-times" aria-hidden="true"></i></button>
        //     </div>
        // </div>
    );


    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </section>
    );
}

export { MyDropzone };