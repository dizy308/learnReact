import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const books = [
  {
    author: "Mel Robbins",
    title: "The Let Them Theory",
    img: "./images/book-1.jpg",
    id: 1,
  },
  {
    author: "Joel Roy",
    title: "Let him cook",
    img: "./images/book-2.jpg",
    id: 2,
  },
  {
    author: "Author Third Book",
    title: "The 3rd book Title",
    img: "./images/book-3.jpg",
    id: 3,
  },
];

const BookList = () => {
  return (
    <section className="booklist">
      <EventExamples />
      {books.map((book) => {
        return <Book {...book} key={book.id} />;
      })}
    </section>
  );
};

const EventExamples = () => {
  const handleFormInput = (e) => {
    console.log(e.target.value);
  };
  const handleButtonClick = () => {
    console.log("Handle button click");
  };
  const handleFormSubmission = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <section>
      <form onSubmit={handleFormSubmission}>
        <h2>Typical Form</h2>
        <input
          type="text"
          name="example"
          onChange={handleFormInput}
          style={{ margin: "1rem 0" }}
        ></input>
        <div>
          <button type="submit">Submit Button</button>
        </div>
        <button onClick={handleButtonClick}>Click this area</button>
      </form>
    </section>
  );
};

const Book = (props) => {
  const { author, title, img } = props;
  const printSomething = () => {
    alert(title);
  };
  return (
    <article className="book">
      <img src={img} alt={title}></img>
      <p>Title: {title}</p>
      <p>Author: {author}</p>
      <button onClick={printSomething}>Click here</button>
    </article>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BookList />);
