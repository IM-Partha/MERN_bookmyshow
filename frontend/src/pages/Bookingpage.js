import React, { useState } from "react";
import { movies, slots, seat } from "./data";
import bookmyshow from '../image/bookmyshow.png';
import { HandelCreate, HandelGateData } from "./Api";
import './Bookingpage.css'; // Import your custom CSS file
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Bookingpage = () => {
  const [movie, setmovies] = useState("");
  const [slot, setslot] = useState("");
  const [sea, setsea] = useState("");
  const [seats, setSeatValues] = useState({});
  const [allData, setAlldata] = useState([]);


  const handelInput = (sea, event) => {
    const value = parseInt(event.target.value);
    if(value>=1 && value<=5 ){
      setSeatValues((prev) => ({ ...prev, [sea]: value }));
    }
     
  };

  const obj = {
    movie,
    slot,
    seats,
  };

  const handelsubmit = async () => {
   try{
    const response =  await HandelCreate(obj);
   if(response){
    
    setmovies("");
    setslot("");
    setsea("");
    setSeatValues({});
    let datas = await HandelGateData();
    if (datas && datas.data) {
      setAlldata(datas.data);
    }
    toast.success(response.data.message || 'Booking Successful');
  }
   }catch (errorMessage) {
    toast.error(errorMessage);
    console.log(`Booking Faild ${errorMessage}`);
  
  }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8">
          <img
            style={{ width: '150px', height: '100px', maxWidth: '100%' }}
            src={bookmyshow}
            alt="Book My Show"
          />

          <div className="mb-4">
            <h4>Select A Movie</h4>
            <div className="d-flex flex-wrap border border-dark rounded">
              {movies.map((item, index) => (
                <div key={index} className="p-2 col-6 col-md-4 col-lg-4">
                  <p
                    className="border p-2 text-center"
                    onClick={() => setmovies(item)}
                    style={{
                      backgroundColor: item === movie ? "#e74c3c" : "#ecf0f1",
                      color: item === movie ? "white" : null,
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4>Select a Time Slot</h4>
            <div className="d-flex flex-wrap border border-dark rounded">
              {slots.map((item, index) => (
                <div key={index} className="p-2 col-6 col-md-4 col-lg-3">
                  <p
                    className="border p-2 text-center"
                    onClick={() => setslot(item)}
                    style={{
                      backgroundColor: item === slot ? "#e74c3c" : "#ecf0f1",
                      color: item === slot ? "white" : null,
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4>Select The Seats</h4>
            <div className="d-flex flex-wrap border border-dark rounded">
              {seat.map((item, index) => (
                <div key={index} className="p-2 col-6 col-md-4 col-lg-3">
                  <p
                    className="border p-2 text-center"
                    onClick={() => setsea(item)}
                    style={{
                      backgroundColor: item === sea ? "#e74c3c" : "#ecf0f1",
                      color: item === sea ? "white" : null,
                      cursor: "pointer",
                    }}
                  >
                    {item}{" "}
                    <input style={{borderRadius:'5px',width:'60px',height:'30px'}}
                      type="number"
                      className="mt-2 "
                      value={seats[item] || ""}
                      onChange={(e) => handelInput(item, e)}
                      min="1"
                      max="5"
                      step="1"
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              className="p-2 border-0 mt-3 rounded w-100"
              style={{ backgroundColor: "#e74c3c", color: "#ffffff" }}
              type="submit"
              onClick={handelsubmit}
            >
              Book Now
            </button>
          </div>
        </div>


  {/* Booking History */}

        <div className="col-12 col-md-4">
          <div
            className="p-3 border border-dark rounded mt-5 mt-md-12 "
            style={{ width: "100%", maxWidth: "350px"}}
          >
            {Object.keys(allData).length > 0 ? (
              <h3 className="text-center mb-5">Booking History</h3>
            ) : (
              <h3 className="text-center mb-5">No Previous Booking Found!</h3>
            )}
            {Object.keys(allData).length > 0 ? (
              <>
              <p>
                  Seats:{" "}
                  {Object.keys(allData.seats).map((seat) => (
                    <span key={seat}>
                      {seat}: {allData.seats[seat]}
                      {", "}
                    </span>
                  ))}
                </p>
                <p>Slot: {allData.slot}</p>
                <p>Movie: {allData.movie}</p>
              </>
            ) : (
              <>
                <p>Seats:</p>
                <p>Slot:</p> 
                <p>Movie:</p>
              
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookingpage;
