import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from './Counter';

class App extends Component {

  state = {
    guests: [
      {
        name: 'Treasure',
        isConfirmed: false,
        isEditing: false    
      },
      {
        name: 'Nic',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'Sam',
        isConfirmed: true,
        isEditing: false
      }
    ],
    isFiltered: false,
    pendingGuests: ""
  }

  toggleFilter = () => 
    this.setState({isFiltered: !this.state.isFiltered });

  handleNameInput = (e) => 
    this.setState({ pendingGuests: e.target.value });


  getTotalInvited = () => this.state.guests.length;

  toggleGuestPropertyAt = (property, indexToChange) => 
    this.setState({ 
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
     });

  setNameAt = (name, indexToChange) => 
    this.setState({ 
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name: name
          };
        }
        return guest;
      })
    });
 
  toggleConfirmationAt = (index) => 
     this.toggleGuestPropertyAt("isConfirmed", index);

  removeGuestAt = (index) =>
  this.setState({
    guests: [
      ...this.state.guests.slice(0, index),
      ...this.state.guests.slice(index+1)
    ]
  });

  toggleEditingAt = (index) => 
     this.toggleGuestPropertyAt("isEditing", index);
  
  newGuestSubmitHandler = (e) => {
    e.preventDefault();
    const newplayer = {
      name: this.state.pendingGuests,
      isConfirmed: false,
      isEditing: false
    };
    this.setState( { 
      guests: [
        newplayer,
        ...this.state.guests
      ],
      pendingGuests: ""
     });
  }

  getAttendingGuests = () => 
    this.state.guests.reduce((total, guest) => guest.isConfirmed ? total + 1 : total, 0);

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;

    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>A Treehouse App</p>
          <form onSubmit={this.newGuestSubmitHandler}>
              <input 
              type="text" 
              onChange={this.handleNameInput}
              value={this.state.pendingGuests}
              placeholder="Invite Someone" />
              <button 
              type="submit" 
              name="submit" 
              value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input 
              type="checkbox" 
              onChange={this.toggleFilter}
              checked={this.state.isFiltered}
              /> Hide those who haven't responded
            </label>
          </div>
          <Counter totalInvited={totalInvited} 
            numberUnconfirmed={numberUnconfirmed}
            numberAttending={numberAttending}
          />
         
          <GuestList 
          guests={this.state.guests} 
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          isFiltered={this.state.isFiltered}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuests}
          />
        </div>
    </div>
    );
  }
}

export default App;
