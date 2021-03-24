
import React from 'react';
import {Menu} from 'semantic-ui-react'


const BookContainer = props => {
 
    return (
        <>
            {this.props.books.map(book => <Book book={book} key={book.id} captureBook={this.captureBook}/>)}
        </>
    )

}

export default BookContainer

