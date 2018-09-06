import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResults from "../image-results/ImageResults";

class Search extends Component {
  state = {
    searchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "10037293-d83bb4a2e43dbd466dea8c144",
    images: []
  };

  onTextChange = e => {
    let val = e.target.value;
    if (val === "") {
      this.setState({
        [e.target.name]: val,
        images: []
      });
    } else {
      this.setState(
        {
          [e.target.name]: val
        },
        () => {
          axios
            .get(
              `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
                this.state.searchText
              }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
            )
            .then(res =>
              this.setState({
                images: res.data.hits
              })
            )
            .catch(e => console.log(e));
        }
      );
    }
  };
  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  };

  render() {
    const { images, searchText, amount } = this.state;
    console.log(images);
    return (
      <div>
        <TextField
          name="searchText"
          value={searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>

        <br />
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
