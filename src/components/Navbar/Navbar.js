import React, { Component } from "react";
import "./Navbar.css";

const searchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
);

class Navbar extends Component {
    render() {
        return (
            <nav
                className={`${
                    this.props.className ? this.props.className : ""
                } elevation-3 flex-vertical`}
            >
                <div className="flex-horizontal">
                    <div className="search-container">
                        {searchIcon}
                        <input
                            type="text"
                            id="picture-filter"
                            name="pictureFilter"
                            placeholder="Search Pics"
                            onChange={this.props.onSearchInputChange}
                        />
                    </div>
                    <select
                        name="sort-by"
                        id="sort-by"
                        onChange={() =>
                            this.props.onSortByOptionChange(
                                this.getSelectedValue()
                            )
                        }
                    >
                        <option value="relevance">Relevance</option>
                        <option value="date-posted-asc">
                            Date posted (asc.)
                        </option>
                        <option value="date-posted-desc">
                            Date posted (desc.)
                        </option>
                    </select>
                </div>
                <p>
                    {this.getInputValue().length > 0
                        ? `Results found: ${this.getResultsCount()}`
                        : "Search something!"}
                </p>
            </nav>
        );
    }

    getSelectedValue() {
        const select = document.getElementById("sort-by");
        return select.options[select.selectedIndex].value;
    }

    getInputValue() {
        const input = document.getElementById("picture-filter");
        return input ? input.value.trim() : "";
    }

    getResultsCount() {
        const { resultsCount } = this.props;
        return resultsCount ? resultsCount : "";
    }
}

export default Navbar;
