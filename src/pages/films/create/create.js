import React from "react";
import { Redirect } from "react-router";

import axios from 'axios';
import { MyDropzone } from "./dropzone";

import { GenreSelect } from './select';


class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'asdasd', slugName: '', description: 'asdasd', rating: 1, date: (new Date()).toISOString().substr(0, 10),
            releaseDate: (new Date()).toISOString().substr(0, 10), genres: [], files: [], remoteServer: this.props.data.remoteServer,
            country: 'asdasd', ticket: 1, price: 1, token: true
        };
        // handle create movie form filelds
        this.handleName = this.handleName.bind(this);
        this.handleSlugName = this.handleSlugName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);

        this.handleDate = this.handleDate.bind(this);
        this.handleReleaseDate = this.handleReleaseDate.bind(this);

        this.handleRating = this.handleRating.bind(this);

        this.handleGenres = this.handleGenres.bind(this);

        this.handleCountry = this.handleCountry.bind(this);
        this.handleTicket = this.handleTicket.bind(this);
        this.handlePrice = this.handlePrice.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getImage = this.getImage.bind(this);

    }
    // images for preview
    async getImage(file) {
        await this.setState({
            files: file.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        });
        console.log("here", this.state.files);
    }

    handleName(event) {
        this.setState({ name: event.target.value });
    }
    handleGenres(event) {

        // console.log("event genre", event)
        // if (event) {
        //     let genreNames = [];
        //     event.forEach(element => {
        //         genreNames.push(element.value);
        //     });
        //     this.setState({ genres: genreNames });

        // } else {
        //     this.setState({ genres: [] });
        // }
        this.setState({ genres: event })
    }
    handleSlugName(event) {
        this.setState({ slugName: event.target.value });
    }
    handleDescription(event) {
        this.setState({ description: event.target.value });
    }
    handleDate(event) {
        this.setState({ date: event.target.value });
    }

    handleReleaseDate(event) {
        this.setState({ releaseDate: event.target.value });
    }

    handleRating(event) {
        this.setState({ rating: event.target.value });
    }
    handleCountry(event) {
        this.setState({ country: event.target.value });
    }
    handleTicket(event) {
        this.setState({ ticket: event.target.value });
    }
    handlePrice(event) {
        this.setState({ price: event.target.value });
    }



    handleSubmit(event) {

        event.preventDefault()
        const data = new FormData();
        data.append('name', this.state.name)
        data.append('slug_name', this.state.slugName.split(" ").join("-"))
        data.append('description', this.state.description)
        let genreList = [];
        this.state.genres.forEach(element => {
            genreList.push(element.value);
        });
        data.append('genres', genreList)
        data.append('date', this.state.date)
        data.append('release', this.state.releaseDate)
        data.append('country', this.state.country)
        data.append('ticket', this.state.ticket)
        data.append('price', this.state.price)

        data.append('rating', this.state.rating)

        this.state.files.forEach(file => {
            data.append('myimages[]', file, file.name);
        });
        var self = this;
        let bearer = 'Bearer ' + this.props.data.token;
        axios.post(this.state.remoteServer + 'movieSubmit', data, {
            headers: {
                "Content-Type": "multipart/form-data", ctype: 'multipart/form-data',
                'Authorization': bearer
            }
        })
            .then(function (response) {
                console.log('create', response.data.token)
                if (response.data.token === false) {
                    self.setState({ token: false })
                } else {
                    self.setState({
                        name: 'asdasd',
                        slugName: '',
                        description: 'asdasd',
                        files: [],
                        rating: 1,
                        ticket: 1,
                        price: 1,
                        date: (new Date()).toISOString().substr(0, 10),
                        genres: [],
                        releaseDate: (new Date()).toISOString().substr(0, 10),
                        country: 'asdasd'

                    })
                }
                alert(response.data)


            })
            .catch(function (error) {
                console.log('error', error)
            });




    }

    render() {
        console.log("token", this.state.token)
        return (
            this.state.token === true ?
                <div className="row">
                    <div className="col-12">
                        <form className="theme-form mega-form" onSubmit={(event) => this.handleSubmit(event)} ctype='multipart/form-data'>
                            <div className="card">
                                <div className="card-header">
                                    <h5>Create Movie</h5>
                                </div>
                                <div className="card-body">


                                    <div className="form-group ">
                                        <label className="col-form-label">Name</label>
                                        < input className="form-control" type="text" value={this.state.name} onChange={this.handleName} placeholder="Enter Name" required />
                                    </div>
                                    <div className="form-group ">
                                        <label className="col-form-label">Slug Name</label>
                                        < input className="form-control" type="text" value={this.state.slugName} onChange={this.handleSlugName} placeholder="Enter Slug Name" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Description</label>
                                        < input className="form-control" type="text" value={this.state.description} onChange={this.handleDescription} placeholder="Enter Description" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Date</label>
                                        <input className="form-control" type="date" placeholder="Enter date" onChange={this.handleDate} value={this.state.date} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Release Date</label>
                                        <input className="form-control" type="date" placeholder="Enter relase date" onChange={this.handleReleaseDate} value={this.state.releaseDate} />
                                    </div>

                                    <hr className="mt-4 mb-4" />

                                    <div className="form-group">
                                        <label className="col-form-label">Rating</label>
                                        <input className="form-control" type="number" step="1" value={this.state.rating} onChange={this.handleRating} min="1" max="5" placeholder="Insert Rating " />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Ticket</label>
                                        <input className="form-control" type="number" step="1" value={this.state.ticket} onChange={this.handleTicket} min="1" placeholder="Insert Ticket No " />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Price</label>
                                        <input className="form-control" type="number" step="1" value={this.state.price} onChange={this.handlePrice} min="1" placeholder="Insert Price " />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Photo</label>
                                        <MyDropzone files={this.state.files} getImage={this.getImage}></MyDropzone>

                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Genre</label>
                                        <GenreSelect handleGenres={this.handleGenres} genres={this.state.genres} data={this.props.data}></GenreSelect>

                                    </div>
                                    <div className="form-group ">
                                        <label className="col-form-label">Country</label>
                                        < input className="form-control" type="text" value={this.state.country} onChange={this.handleCountry} placeholder="Enter Country" required />
                                    </div>

                                    <hr className="mt-4 mb-4" />
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary mr-1">Submit</button>

                                </div>
                            </div>
                        </form>
                    </div>

                </div > :
                <Redirect to="/login"></Redirect>


        );
    }
}

export { Create };
