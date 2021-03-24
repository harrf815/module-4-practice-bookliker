import React from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";
import BookContainer from "./components/BookContainer";


const API = `http://localhost:3000/books/:id`
const defaultUser = { id: 1, username: "pouros" }

class App extends React.Component {

  state = {
    books: [],
    selectedBook: {}
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(data => this.setState({books: data}))
  }

  captureBook = (bookdId) => {
    this.setState({
      selectedBook: this.state.books.find(book => book.id ===bookdId)
    })
  }

  patchLike(book) {
    fetch(API + `/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        users: [...book.users, defaultUser]
      })
    })
    .then(res => res.json())
    .then(book => {
      this.setState ({selectedBook: book})
    })
  }

  renderDefault() {
    return (
      <>
          <Header>Book title</Header>
          <Image
            src="https://react.semantic-ui.com/images/wireframe/image.png"
            size="small"
          />
          <p>Book description</p>
          <Button
            color="red"
            content="Like"
            icon="heart"
            label={{
              basic: true,
              color: "red",
              pointing: "left",
              content: "2,048"
            }}
          />
          <Header>Liked by</Header>
          <List>
            <List.Item icon="user" content="User name" />
          </List>
      </>
    )
  }

  renderSelected() {
    return (
      <>
      <Header>{this.state.selectedBook.title}</Header>
      <Image
        src={this.state.selectedBook.img_url}
        size="small"
      />
      <p>{this.state.selectedBook.decription}</p>
      <Button
        color="red"
        content="Like"
        icon="heart"
        label={{
          basic: true,
          color: "red",
          pointing: "left",
          content: this.state.selectedBook.users.length
        }}
        onClick={() => this.patchLike(this.state.selectedBook)}
      />
      <Header>Liked by</Header>
      <List>
        <List.Item icon="user" content="User name" />
        {this.state.selectedBook.users.map(user => {
          return(
            <List.Item icon="user" content={user.username} key={user.id} />
          )
        })}
      </List>
  </>
    )
  }

  render() {
  return (
    <div>
      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
        <Menu vertical inverted>
          <Menu.Item as={"a"} onClick={e => console.log("book clicked!")}>
            Book title
          </Menu.Item>
          <BookContainer books={this.state.books} captureBook={this.captureBook}/>
        </Menu>
        <Container text>
          {this.state.selectedBook.title ?
          this.renderSelected() :
          this.renderDefault()
          }
        </Container>
      </main>
    </div>
  );
  }
}

export default App;
