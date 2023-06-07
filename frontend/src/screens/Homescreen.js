import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration: 1000,
});

const { RangePicker } = DatePicker;

function Homescreen() {
  const hardcodedata = [
    {
      _id: {
        $oid: '6110ae308adb7a0ec49450ca',
      },
      name: 'Four star hotel in Lahore pakistan ',
      imageurls: [
        'https://images.oyoroomscdn.com/uploads/hotel_image/56303/medium/597f0e48823f8885.jpg',
        'https://images.oyoroomscdn.com/uploads/hotel_image/56303/medium/06883e94ec59702e.jpg',
        'https://images.oyoroomscdn.com/uploads/hotel_image/56303/medium/91dead74a5dffa61.jpg',
      ],
      rentperday: 1500,
      type: 'Delux',
      maxcount: 3,
      phonenumber: 9989649278,
      currentbookings: [],
      description: '5 star in Islamabad',
      __v: 7,
      createdAt: {
        $date: '2021-08-13T14:30:08.884Z',
      },
      updatedAt: {
        $date: '2021-08-14T03:12:27.930Z',
      },
    },
    {
      _id: {
        $oid: '6110ae308adb7a0ec49450cb',
      },
      name: 'Rifa Hotel in Rawlpindi ',
      imageurls: [
        'https://images.oyoroomscdn.com/uploads/hotel_image/105649/large/8e80e24a5496eb80.jpg',
        'https://images.oyoroomscdn.com/uploads/hotel_image/105649/large/caef038a4b97b589.jpg',
        'https://images.oyoroomscdn.com/uploads/hotel_image/105649/large/46bffe91d06dcb96.jpg',
      ],
      rentperday: 1500,
      type: 'Delux',
      maxcount: 3,
      phonenumber: 9989649278,
      currentbookings: [],
      description:
        'Hotel Shiva Sai Lodge is a furnished and modest property located in Regimental Bazaar, Shivaji Nagar, Secunderabad, Telangana.The property is in close vicinity to multiple tourist spots namely Sanjeeviah Park, Buddha Statue, Snow World, and Birla Science Museum.',
    },
    {
      _id: {
        $oid: '6110ae308adb7a0ec49450cc',
      },
      name: 'kotlakhpat hotel ',
      imageurls: [
        'https://images.oyoroomscdn.com/uploads/hotel_image/107625/large/4488071a59d38cc5.jpg',
        'https://images.oyoroomscdn.com/uploads/hotel_image/107625/large/d452b4897a767f6b.jpg',
        'https://images.oyoroomscdn.com/uploads/hotel_image/107625/large/8f690e54761344e0.jpg',
      ],
      rentperday: 2000,
      type: 'Non-Delux',
      maxcount: 3,
      phonenumber: 9989649278,
      currentbookings: [],
      description:
        'Hotel Shiva Sai Lodge is a furnished and modest property located in Regimental Bazaar, Shivaji Nagar, Secunderabad, Telangana.The property is in close vicinity to multiple tourist spots namely Sanjeeviah Park, Buddha Statue, Snow World, and Birla Science Museum.',
    },
    {
      _id: {
        $oid: '6110ae308adb7a0ec49450cd',
      },
      name: 'Sariena adiala hotel',
      imageurls: [
        'https://images.oyoroomscdn.com/uploads/hotel_image/111796/large/e225bbf160a11c02.jpg',
        'https://images.oyoroomscdn.com/uploads/hotel_image/111796/large/d55361043c9b52af.jpg',
        'https://images.oyoroomscdn.com/uploads/hotel_image/111796/large/2f7029d3c5429b5f.jpg',
      ],
      rentperday: 1600,
      type: 'Non-Delux',
      maxcount: 4,
      phonenumber: 9989649278,
      currentbookings: [],
      description:
        'Couples are welcome Guests can check in using any local or outstation ID proof (PAN card not accepted). Only Indian Nationals allowed As a complimentary benefit, your stay is now insured by Acko. This hotel is serviced under the trade name of Sri Navya Grand as per quality standards of OYO',
    },
    {
      _id: {
        $oid: '6110ae308adb7a0ec49450ce',
      },
      name: 'Capital ',
      imageurls: [
        'https://images.oyoroomscdn.com/uploads/hotel_image/38668/large/414e401312ad45a7.jpg',
        'https://images.oyoroomscdn.com/uploads/hotel_image/38668/large/d24b920cfdddeecb.jpg',
        'https://images.oyoroomscdn.com/uploads/hotel_image/38668/large/58025558878fa4ec.jpg',
      ],
      rentperday: 1800,
      type: 'Non-Delux',
      maxcount: 3,
      phonenumber: 9989649278,
      currentbookings: [],
      description:
        'Night Curfew in Telangana | Check-in allowed between 05:00 AM to 09:00 PM Couples are welcome Guests can check in using any local or outstation ID proof (PAN card not accepted). As a complimentary benefit, your stay is now insured by Acko.This hotel is serviced under the trade name of The City Park as per quality standards of OYO',
    },
  ];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState([]);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError('');
        setLoading(true);
        const response = await axios.get('/api/rooms/getallrooms');
        const data = response.data;
        console.log('fetching all rooms data');
        console.log(data);
        const allRooms = [...data, ...hardcodedata];
        setRooms(allRooms);
        setDuplicateRooms(allRooms);
      } catch (error) {
        console.log(error);
        setError('Something went wrong. Loading hardcoded data...');
        setRooms(hardcodedata);
        setDuplicateRooms(hardcodedata);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  function filterByDate(dates) {
    // console.log(moment(dates[0]).format("DD-MM-YYYY"));
    // console.log(moment(dates[1]).format("DD-MM-YYYY"));
    try {
      setFromDate(moment(dates[0]).format('DD-MM-YYYY'));
      setToDate(moment(dates[1]).format('DD-MM-YYYY'));

      var tempRooms = [];
      for (const room of duplicateRooms) {
        var availability = false;
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            if (
              !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(
                booking.fromdate,
                booking.todate
              ) &&
              !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) {
              if (
                moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
              ) {
                availability = true;
              }
            }
          }
        }
        //
        if (availability == true || room.currentbookings.length == 0) {
          tempRooms.push(room);
        }
      }
      setRooms(tempRooms);
    } catch (error) {}
  }

  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((x) =>
      x.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setRooms(tempRooms);
  }
  function filterByType(type) {
    setType(type);
    console.log(type);
    if (type !== 'all') {
      const tempRooms = duplicateRooms.filter(
        (x) => x.type.toLowerCase() == type.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader></Loader>
        ) : error.length > 0 ? (
          <Error msg={error}></Error>
        ) : (
          rooms.map((x) => {
            return (
              <div className="col-md-9 mt-3" data-aos="flip-down">
                <Room room={x} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
