class BooksController < ApplicationController
  before_action :set_book, only: %i[destroy complete]

  def index
    render json: {
      # books: Book.all
      books: current_user.books
    }, status: :ok
  end

  def create
    # book = Book.new(book_params)
    book = current_user.books.new(book_params)

    if book.save
      render json: {
        book: book
      }, status: :created
    else
      render json: {
        messages: book.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @book.destroy
    
    render json: {
        messages: ["book deleted"]
        }, status: :ok
  end

  def complete
    if @book.update(completed: true)
      render json: {
        book: @book
      }, status: :ok
    else
      render json: {
        messages: @book.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def set_post
    @book = Book.find(params[:id])
    @book = current.books.find(params[:id])
  end

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title)
  end
end
