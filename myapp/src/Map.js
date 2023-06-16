import React from 'react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from 'axios';
import { useMemo } from "react";
import "./App.css";
import { useState, useRef, useEffect } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import logoSmall from './images/logo_small.png';
import cmdIcon from './images/cmd.png';
import logbookIcon from './images/logbook.png';
import maintenanceIcon from './images/maintenance.png';
import markerIcon from './images/marker.png';
import dashboardIcon from './images/dashboard.png';
import infoIcon from './images/info.png';
import expensesIcon from './images/expenses.png';
import dtcIcon from './images/dtc.png';
import chatIcon from './images/chat.png';
import galleryIcon from './images/gallery.png';
import reportIcon from './images/report.png';
import searchIcon from './images/search.png';
import settingsIcon from './images/settings.png';
import tasksIcon from './images/tasks.png';
import objectAddIcon from './images/object-add.png';
import refreshColorIcon from './images/refresh-color.png';
import eyeIcon from './images/eye.png';
import followIcon from './images/follow.png';
import carIcon from './images/car.png';
import enginIcon from './images/engin.png';
import wifiIcon from './images/wifi.png';
import arrowIcon from './images/arrow.png';


const MyComponent = () => {
  const iconStyle = {
    marginRight: '8px',
    width: '20px',
  };

  

  const [vehicleName0, setVehicleName0] = useState('Eco 3029 ');
  const [imeiNumber0, setImeiNumber0] = useState('350424066311786');
  const [vehicleName1, setVehicleName1] = useState('Eco 7692');
  const [imeiNumber1, setImeiNumber1] = useState('354017112561994');
  const [vehicleName2, setVehicleName2] = useState('TVS ');
  const [imeiNumber2, setImeiNumber2] = useState('355172105372914');
  const [vehicleName3, setVehicleName3] = useState('Okinawa Ridz');
  const [imeiNumber3, setImeiNumber3] = useState('355172105372898');
  const [vehicleName4, setVehicleName4] = useState('Blue Activa ' );
  const [imeiNumber4, setImeiNumber4] = useState('355172105371643');
 


  const handleVehicleNameChange = (event) => {
    setVehicleName0(event.target.value);
  };

  const handleImeiNumberChange = (event) => {
    setImeiNumber0(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    setVehicleName0('');
    setImeiNumber0('');
  };

  const App = () => {
    const [markers, setMarkers] = useState([])
    const { isLoaded } = useLoadScript({});

    const [showMarker, setShowMarker] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setShowMarker(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }, []);

    const mapContainerStyle = {
      height: "800px",
      width: "1400px",
    };


    const center = {
      lat: 23.32004444,
      lng: 85.29802667,
    };


    useEffect(() => {
      setInterval(sendRequest, 10000);
      sendRequest();
    }, []);

 
    const sendRequest = async () => {
      const uniqueId =  localStorage.getItem('uniqueId');
      const url = 'http://23.88.50.20:3000/api/user-devices';
      const params = {
        id: uniqueId,
      };
      try {
        const requestOptions = {
          method: 'POST',
          headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(params).toString()
        };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        const devices = data.data;
        const marker = [];
        for (let index = 0; index < devices.length; index++) {
          const element = devices[index];
          marker.push(<Marker position={{ lat: Number(element.lat), lng: Number(element.lng) }} />);
        }
        setMarkers(marker);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
 
  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };
 

  return (
    <div className="svg" style={{ backgroundColor: '' }}>
      <img src={logoSmall} alt="Logo Small" style={iconStyle} />
      <img src={cmdIcon} alt="CMD Icon" style={iconStyle} />
      <img src={logbookIcon} alt="Logbook Icon" style={iconStyle} />
      <img src={maintenanceIcon} alt="Maintenance Icon" style={iconStyle} />
      <img src={markerIcon} alt="Marker Icon" style={iconStyle} />
      <img src={dashboardIcon} alt="Dashboard Icon" style={iconStyle} />
      <img src={infoIcon} alt="Info Icon" style={iconStyle} />
      <img src={chatIcon} alt="Chat Icon" style={iconStyle} />
      <img src={dtcIcon} alt="Dtc Icon" style={iconStyle} />
      <img src={expensesIcon} alt="Expenses Icon" style={iconStyle} />
      <img src={galleryIcon} alt="Gallery Icon" style={iconStyle} />
      <img src={reportIcon} alt="Report Icon" style={iconStyle} />
      <img src={searchIcon} alt="Search Icon" style={iconStyle} />
      <img src={settingsIcon} alt="Settings Icon" style={iconStyle} />
      <img src={tasksIcon} alt="Tasks Icon" style={iconStyle} />
      <img src={objectAddIcon} alt="Object Add Icon" style={iconStyle} />
      <img src={eyeIcon} alt="Eye Icon" style={iconStyle} />
      <img src={followIcon} alt="Follow Icon" style={iconStyle} />

     
      <div className="menu">
        <ul>
          <li>Objects</li>
          <li>Events</li>
          <li>Places</li>
          <li>History</li>
        </ul>
      </div>  
      <div className="search">
        <input type="text" placeholder="Search.." />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <img src={refreshColorIcon} alt="Refresh Color Icon" style={iconStyle} />
        <img src={objectAddIcon} alt="Object Add Icon" style={iconStyle} />
      </div>

      <div className="obj">
        <img src={eyeIcon} alt="Eye Icon" style={iconStyle} />
        <img src={followIcon} alt="Follow Icon" style={iconStyle} />
        <input type="text" className="field" placeholder="Objects.." />
      </div>

      <div className="map">
        <input type="checkbox" id="vehicle1" name="vehicle1" className="type" value="Bike" />
        <input type="checkbox" id="vehicle2" name="vehicle2" className="type" value="Car" />

        <label htmlFor="vehicle1" className="lab">
          Ungrouped (6) -
        </label>
      
      </div>
      

      <div className="car">
            <input type="checkbox" id="vehicle3" name="vehicle3" className="type" value="Bike" />
             <input type="checkbox" id="vehicle4" name="vehicle4" className="type" value="Car" />
             <img src={carIcon} alt="Car Icon" style={iconStyle} />
             <span style={{ fontSize: '11px' }}>{vehicleName0}</span>
             <span style={{ fontSize: '10.2px' }}>{imeiNumber0}</span>

            <img src={enginIcon} alt="Engine Icon" className="eng" style={{ ...iconStyle, marginLeft: '1.5%', }} />
            <img src={wifiIcon} alt="Wifi Icon" className="eng" style={{ ...iconStyle, marginLeft: '0.1%' }} />
  
            <i className="fas fa-ellipsis-v"></i>
      </div>

      <div className="car">
        <input type="checkbox" id="vehicle5" name="vehicle5" className="type" value="Bike" />
        <input type="checkbox" id="vehicle6" name="vehicle6" className="type" value="Car" />
        <img src={carIcon} alt="Car Icon" style={iconStyle} />
        <span style={{ fontSize: '11px' }}>{vehicleName1}</span>
<span style={{ fontSize: '10.2px' }}>{imeiNumber1}</span>

        <img src={enginIcon} alt="Engine Icon" className="eng" style={{ ...iconStyle, marginLeft: '1.7%' }} />
        <img src={wifiIcon} alt="Wifi Icon" className="eng" style={{ ...iconStyle, marginLeft: '0.1%' }} />
        <i className="fas fa-ellipsis-v"></i>
      </div>

      <div className="car">
        <input type="checkbox" id="vehicle7" name="vehicle7" className="type" value="Bike" />
        <input type="checkbox" id="vehicle8" name="vehicle8" className="type" value="Car" />
        <img src={carIcon} alt="Car Icon" style={iconStyle} />
        <span style={{ fontSize: '11px' }}>{vehicleName2}</span>
<span style={{ fontSize: '10.2px' }}>{imeiNumber2}</span>

        <img src={enginIcon} alt="Engine Icon" className="eng" style={{ ...iconStyle, marginLeft: '2.8%' }} />
        <img src={wifiIcon} alt="Wifi Icon" className="eng" style={{ ...iconStyle, marginLeft: '0.1%' }} />
        <i className="fas fa-ellipsis-v"></i>
      </div>

      <div className="car">
        <input type="checkbox" id="vehicle9" name="vehicle9" className="type" value="Bike" />
        <input type="checkbox" id="vehicle10" name="vehicle10" className="type" value="Car" />
        <img src={carIcon} alt="Car Icon" style={iconStyle} />
        <span style={{ fontSize: '11px' }}>{vehicleName3}</span>
<span style={{ fontSize: '10.2px' }}>{imeiNumber3}</span>

        <img src={enginIcon} alt="Engine Icon" className="eng" style={{ ...iconStyle, marginLeft: '0.5%' }} />
        <img src={wifiIcon} alt="Wifi Icon" className="eng" style={{ ...iconStyle, marginLeft: '0.1%' }} />
        <i className="fas fa-ellipsis-v"></i>
      </div>

      <div className="car">
        <input type="checkbox" id="vehicle11" name="vehicle11" className="type" value="Bike" />
        <input type="checkbox" id="vehicle12" name="vehicle12" className="type" value="Car" />
        <img src={carIcon} alt="Car Icon" style={iconStyle} />
        <span style={{ fontSize: '11px' }}>{vehicleName4}</span>
<span style={{ fontSize: '10.2px' }}>{imeiNumber4}</span>

        <img src={enginIcon} alt="Engine Icon" className="eng" style={{ ...iconStyle, marginLeft: '1%' }} />
        <img src={wifiIcon} alt="Wifi Icon" className="eng" style={{ ...iconStyle, marginLeft: '0.1%' }} />
        <i className="fas fa-ellipsis-v"></i>
      </div>

      <div className="car">
        <input type="checkbox" id="vehicle13" name="vehicle13" className="type" value="Bike" />
        <input type="checkbox" id="vehicle14" name="vehicle14" className="type" value="Car" />
        <img src={carIcon} alt="Car Icon" style={iconStyle} />
        <img src={enginIcon} alt="Engine Icon" className="eng" style={{ ...iconStyle, marginLeft: '8.3%' }} />
        <img src={wifiIcon} alt="Wifi Icon" className="eng" style={{ ...iconStyle, marginLeft: '0.1%' }} />
        <i className="fas fa-ellipsis-v"></i>
      </div>
      

      <div className="map-image" style={{ marginLeft: '17%', marginTop: '-14%' }}>
      <div className="App">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          onLoad={() => {
            // Handle onLoad logic if needed
          }}
        >
          {/* {showMarker && (
            
          )} */}
         {markers.map((marker) => (
           <div>
         <img src={require('./images/arrow.png')} alt="Arrow Icon"/></div>
           ))}
        </GoogleMap>
        )}
      </div>
    </div>
    </div>
    
  );
};

return <App />;
};

export default MyComponent;