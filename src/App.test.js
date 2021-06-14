import { render, screen, getByText, fireEvent, waitFor } from '@testing-library/react';
import Post from './components/Post';
import Posts from './routes/Posts';
import { BrowserRouter } from 'react-router-dom';

test('render post', () => {
  render(
    <BrowserRouter>
      <Post />
    </BrowserRouter>
  );

  expect(screen.getByTestId('post')).toBeInTheDocument();
})

test('render comment', () => {
  const obj = {};
  render(
    <BrowserRouter location={obj}>
  
      <Post 
        body={'test'}
        title={'test'}
        comments={
            [
              {
                body: 'test body',
                name: 'test title',
                email: 'test@email.com'
              }
            ]
        }
      />
    </BrowserRouter>
  );

  expect(screen.getByTestId('comment')).toBeInTheDocument();
})

test('submit form', ()=>{
  const obj = {};
  render(
    <BrowserRouter location={obj}>
      <Posts />
    </BrowserRouter>
  )

  const emailInput = screen.getByTestId('email-input');
  const nameInput = screen.getByTestId('name-input');
  const bodyInput = screen.getByTestId('comment-input');
  const submitButton = screen.getByTestId('submitbtn');

  fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
  fireEvent.change(nameInput, { target: { value: 'Cool Guy' } });
  fireEvent.change(bodyInput, { target: { value: 'this is a test' } });

  fireEvent.click(submitButton);

  waitFor(() => {
    expect(getByText('this is not a test')).toBeInTheDocument();
  });

})
