import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const MovieForm = (props) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.message, err.response));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        const newMovieList = props.movies.map((m) => {
          if (m.id === movie.id) {
            return movie;
          }
          return m;
        });
        props.setMovieList(newMovieList);
        push("/");
      })
      .catch((err) => console.log(err.message, err.response));
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" onChange={handleChange} value={movie.title}></input>
        <input
          name="director"
          onChange={handleChange}
          value={movie.director}
        ></input>
        <input
          name="metascore"
          onChange={handleChange}
          value={movie.metascore}
        ></input>
        <input name="stars" onChange={handleChange} value={movie.stars}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MovieForm;
