import React from "react";
import $ from "jquery";
import Loading from "./Loading";
import DadJoke from "./DadJoke";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joke: "",
      isLoading: true,
    };

    $.ajax({
      type: "GET",
      url: "https://icanhazdadjoke.com/",
      headers: { Accept: "application/json" },
    }).then((response) => {
      this.setState({ isLoading: false, joke: response.joke });
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <DadJoke joke={this.state.joke} />
          )}
        </div>
        <button
          onClick={() => {
            this.setState({ isLoading: true });

            $.ajax({
              type: "GET",
              url: "https://icanhazdadjoke.com/",
              headers: { Accept: "application/json" },
            }).then((response) => {
              this.setState({ joke: response.joke, isLoading: false });
            });
          }}
        >
          Give me another dad joke
        </button>
      </div>
    );
  }
}
