import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import MainContent from './MainContent';

class App extends Component {

  state = {
    guests: [],
    isFiltered: false,
    pendingGuests: ''
  }

  lastGuestId = 0;

  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId += 1;
    return id;
  };

  toggleFilter = () => 
    this.setState({isFiltered: !this.state.isFiltered });

  handleNameInput = (e) => 
    this.setState({ pendingGuests: e.target.value });


  getTotalInvited = () => this.state.guests.length;

  toggleGuestPropertyAt = (property, id) => 
    this.setState({ 
      guests: this.state.guests.map(guest => {
        if (id === guest.id) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
     });

  setNameAt = (name, id) => 
    this.setState({ 
      guests: this.state.guests.map(guest => {
        if (id === guest.id) {
          return {
            ...guest,
            name: name
          };
        }
        return guest;
      })
    });
 
  toggleConfirmationAt = (id) => 
     this.toggleGuestPropertyAt("isConfirmed", id);

  removeGuestAt = (id) =>
  this.setState({
    guests: this.state.guests.filter(guest => id !== guest.id)
  });

  toggleEditingAt = (id) => 
     this.toggleGuestPropertyAt("isEditing", id);
  
  newGuestSubmitHandler = (e) => {
    e.preventDefault();
    const id = this.newGuestId();
    this.setState( { 
      guests: [
        {
          name: this.state.pendingGuests,
          isConfirmed: false,
          isEditing: false,
          id: id
        },
        ...this.state.guests
      ],
      pendingGuests: ''
     });
  }

  getAttendingGuests = () => 
    this.state.guests.reduce((total, guest) => guest.isConfirmed ? total + 1 : total, 0);

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = this.getTotalInvited() - this.getAttendingGuests();

    return (
      <div className="App">
        <Header
          newGuestSubmitHandler={this.newGuestSubmitHandler}
          pendingGuest={this.state.pendingGuests}
          handleNameInput={this.handleNameInput}
        />
        <MainContent
          toggleFilter={this.toggleFilter}
          isFiltered={this.state.isFiltered}
          totalInvited={totalInvited}
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed}
          guests={this.state.guests}
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuests}
        />
      </div>
    );
  }
}

export default App;
