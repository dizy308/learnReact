import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const books = [
  {
    author: "Mel Robbins",
    title: "The Let Them Theory",
    img: "./images/book-1.jpg",
  },
  {
    author: "Joel Roy",
    title: "Let him cook",
    img: "./images/book-2.jpg",
  },
  {
    author: "Author Third Book",
    title: "The 3rd book Title",
    img: "./images/book-3.jpg",
  },
];

const BookList = () => {
  return (
    <section className="booklist">
      <EventExamples />
      {books.map((book) => {
        return <Book {...book} />;
      })}
    </section>
  );
};

const EventExamples = () => {
  const handleFormInput = (e) => {
    console.log(e.target.value);
  };
  const handleButtonClick = () => {
    alert("Handle button click");
  };
  return (
    <section>
      <form>
        <h2>Typical Form</h2>
        <input
          type="text"
          name="example"
          onChange={handleFormInput}
          style={{ margin: "1rem 0" }}
        ></input>
      </form>
      <button onClick={handleButtonClick}>Click this area</button>
    </section>
  );
};

const Book = (props) => {
  const { author, title, img } = props;
  return (
    <article className="book">
      <img src={img} alt={title}></img>
      <p>Title: {title}</p>
      <p>Author: {author}</p>
    </article>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BookList />);
