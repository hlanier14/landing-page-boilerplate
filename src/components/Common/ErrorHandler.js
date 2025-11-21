import React, { PureComponent } from 'react';

class ErrorHandler extends PureComponent {
  renderMessage = (message) => {
    return (
      <div className="flex justify-center h-screen">
        <div className="m-24">
          <p>{message}</p>
        </div>
      </div>
    );
  };

  render() {
    const { status } = this.props;

    if (status === 404) {
      return this.renderMessage(`We couldn't find the page you were looking for`);
    }

    return this.renderMessage('Something went wrong. Please try again');
  }
}

export default ErrorHandler;