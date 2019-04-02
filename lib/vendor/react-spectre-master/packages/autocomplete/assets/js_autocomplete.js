import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete } from '@react-spectre/autocomplete'

/*
  Use like this <SmartAutocomplete data={[{ name: 'juan' }, { name: 'lucas' }]} />
*/
class SmartAutocomplete extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.removeSelection = this.removeSelection.bind(this)
    this.addElement = this.addElement.bind(this)
    this.searchElement = this.searchElement.bind(this)
    this.originalData = props.data || []
    this.state = {
      dataSelected: [],
      data: this.originalData
    }
  }

  removeSelection(element) {
    this.setState({
      dataSelected: this.state.dataSelected.filter(
        _ => _.name !== element.name
      ),
      data: [...this.state.data, element]
    })
  }

  addElement(element) {
    this.setState({
      dataSelected: [...this.state.dataSelected, element],
      data: this.state.data.filter(_ => _.name !== element.name)
    })
  }

  searchElement(searchTerm) {
    this.setState({
      data: this.originalData.filter(element => {
        return (
          element.name.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
          !this.state.dataSelected.some(_ => _.name === element.name)
        )
      })
    })
  }

  render() {
    return (
      <Autocomplete>
        <Autocomplete.Input focus>
          {this.state.dataSelected.map((element, index) => {
            return (
              <div key={index} className="chip">
                <img className="avatar avatar-sm" alt={element.name} />
                {element.name}
                <button
                  className="btn btn-clear"
                  onClick={() => this.removeSelection(element)}
                />
              </div>
            )
          })}

          <input
            className="form-input"
            type="text"
            placeholder="typing here"
            onChange={e => this.searchElement(e.target.value)}
          />
        </Autocomplete.Input>
        <Autocomplete.Menu>
          {this.state.data.map((element, index) => {
            return (
              <li key={index} className="menu-item">
                <a onClick={() => this.addElement(element)}>
                  <div className="tile tile-centered">
                    <div className="tile-icon">
                      <img className="avatar avatar-sm" alt="Steve Rogers" />
                    </div>
                    <div className="tile-content">{element.name}</div>
                  </div>
                </a>
              </li>
            )
          })}
        </Autocomplete.Menu>
      </Autocomplete>
    )
  }
}

SmartAutocomplete.propTypes = {
  data: PropTypes.array
}

export { SmartAutocomplete }
