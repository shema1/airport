import React from "react";
import moment from "moment";
const Flight = ({term, timeToStand, status, codeShareData,cityTo, cityFrom }) => {
  return (
    <tr className="res-line">
      <td className="terminal-field res-elem">
        <span >{term}</span>
      </td>
      <td  className="time-field res-elem">
        {moment(timeToStand).format("HH:mm")}
      </td>
      <td className="way-field res-elem">
        <span >{cityTo||cityFrom}</span>
      </td>
      <td  className="status-field res-elem">
        <div >{status === "CX" ? "Cancelled" : "WORK"}</div>
      </td>
      <td className="company-name res-elem">
        <ul class="logo">
          {codeShareData.map(data => (
            <li key={data.icao}> 
            <img src={`https://api.iev.aero/${data.logo}`} alt=""/>
            {/* {data.airline.en.name}  */}
            </li>
          ))}
        </ul>
      </td>
      <td className="flight-field res-elem">
        <ul>
          {codeShareData.map(data => (
            <li key={data.codeShare}> {data.codeShare}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default Flight;
