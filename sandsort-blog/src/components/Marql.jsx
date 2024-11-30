/* eslint-disable jsx-a11y/no-distracting-elements */
import React from "react";
import "../css-file/marqu.css";
import { Link } from "react-router-dom";



export default function Marql() {
  return (
    <div className="wrapper">
      <div className="maintxt">
        <h2
          style={{
            textAlign: "center",
            paddingTop: "2rem",
            fontFamily: "",
            font: "bold",
          }}
        >
          View our daily blogs and get to read new contents...
        </h2>
      </div>

      <div className="p-text">
        <p>
          Dive into a world of ideas, inspiration, and discovery. Whether you're
          here for thought-provoking insights, practical tips, or just a fresh
          perspective, you've come to the right place. Explore stories that
          resonate,articles that inform, and discussions that spark curiosity.
          From personal musings to deep dives into trending topics, there is
          something here for everyone. Let us connect, share, and grow
          together—one post at a time. Start exploring today and make yourself
          at home!
        </p>
      </div>

      <div className="marx">
        <span>
          <marquee behavior="scroll" direction="left" scrollamount="5">
              Do visit our blogs page ! Spooky surprises await you on our blog. 👻
          </marquee>
        </span>
      </div>

      <div className="btn_cs" style={{paddingTop:'2rem'}}>
        <button className="redirect-btn">
           <Link style={{textDecoration:'none',fontFamily:'Lucida Sans Unicode', color:'black'}} to='blogs/'>Read Our Blogs</Link> 
        </button>
      </div>

    </div>
  );
}
