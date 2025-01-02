import React from "react";
import { Navbar, Container, Input, Button } from "../../components/components";
import { FaCheck } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function About() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Navbar />
      <motion.div
        ref={ref}
        className="p-[20px] h-[50vw] grid grid-cols-1 lg:grid-cols-2 font-dmSans w-[full] lg:max-w-[1320px] m-auto md:gap-y-40 gap-4"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative lg:px-10 flex lg:justify-start justify-center lg:w-full w-full max-w-[600px] m-auto">
          <div className="w-full lg:w-auto">
            <img
              src={
                "http://localhost:2000/static/media/about-two-img-2.d0993056076a644f80d0.png"
              }
              alt=""
              className="w-full md:w-auto"
            />
          </div>
          <div className="absolute lg:top-[150px] lg:right-0 md:top-[160px] md:right-0 hidden md:block">
            <img
              src={
                "http://localhost:2000/static/media/about-two-img-1.7e8eedf290e30aef521a.jpg"
              }
              alt=""
            />
          </div>
          <div className="px-2 absolute top-[50%] right-[50%] -translate-x-[-50%] -translate-y-[50%] z-[1]">
            <div className="bg-blue-700 rounded-full h-[140px] w-[140px] flex items-center justify-center">
              <img
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAnCAYAAACxMTBTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA31pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNTQ4NjFBN0VDMERFNDExOUVCQUFDRjQ5RjZDMEVBRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNkYwQjdCRjEyMUExMUVEOEM2OEY3N0RBMTdBQkU5QyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNkYwQjdCRTEyMUExMUVEOEM2OEY3N0RBMTdBQkU5QyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NWI5NzFlNi0zOTJlLTA1NDktYjVhNi1lZTg4NDhlOGJkODUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNDkyMjc3Ni1jODE0LWQ1NDUtOWExYy03ZDExODU4ZGE5NDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6qQMPHAAADyElEQVR42tyYTUgVURTH5z2HijTjiX1pmYZKtKjsPa2gXESPqFW7goLARbtWhZugTUWLglq2iCLatGkRtAhatAiE95X2HSIKWZFU2odl6dPXuXAunA53Zu7M3NH3PPAHHZ1583vn3v/93xsrlUrWIq1NoCSRbS8SsCZQioB1gRLsf47HKrCzjQjUiRI/13vcMyo6Xe6dXYswO0nX1gR4zlVQsZw6uwqHX5IMyQYDz/0G2gCatBcQjJpHCl/IZBVBL0DXBai4MB+wdQqwZsOfMQt6CcqBCqjnoL/0n0zD1ipcsSUCsNegPAF7BppSGFkczckYbA3oBOgYGkncINgc6C0C5VH9CrB1oDT7ooWRbTHZ2R7QJdBqA2DCKQcRKIuAA6BfCofep2FkD0Bv6IWgbrwUdBt0JCRYgXRNdOyni5GlcFroOnQ36ElY2CX4raV93DNEwKS+OxhZlwGHzoB28YtBhvE1D9ARApR1AUszlzZpZJdVF/12dj/oEfn9HQGSGmf3rGRQQq0RLXO/cegeQnMLBXsOrV+CfWZ/XwHqIPMrarABMucL6NyzTjeEiYvVoB0kjAu1i2dGAPYH11JqaK8YWAxXhTGnh/iZs7sRTNr9ZsNrqqxpTD8FTEQ5DBFFBtaqmB5XQOfDdjaJ36bpKpKhKCXy7IzHRrwTvYAPa7Gv/Rq2s2cMBvOCW34lG3E6ihIaz7/pBqrb2WZcJ6tC5NcczjkOtp4YWVJzI+70eW247FlhOnvaA1Tm1yyBcwrmSUV+NVH3vEB1OluHa2m1QzB3y69055MyCMZLDN0D+C5WmM4eBN0ncE/lRpjl1242xxoiAptQxM5h3Zv9rrPzccIg6wdbV3MKMBvnqxaEW2cTbH6Jzm2MCGwSRw2NnkMMQrzrVvZOU7jds8LAxnHn0BYRWD87aRhkWbYKN970yHQbaBkzxr26XXWDPWwIlOfXPBrcHPti24mRCcDtoOUez74I6vPzMk5ztg/jYdD8mnEI5hKMzvkOPNrxU3fwKMiX4ag6u0cDdBqHIjUQr/yaQtWEHC0i//b6BXWC7XUJ5jr5lSaiWoNzXRjWKdDDoA+wFS8s1sgb5KRBBdbCXFE3v/qtGdyM3wLdZSPHd+mss00KsHormhq2/j/ozijSmWWqs43sJC9KsBFFGhq3IiwKewF0NqLPGWXrqupIJ/KSw1g45HvFhjhIfWTram4hwNw6ezIg6BgBk1Hvk1WmJTprozF4BfovxKHlkPxgVVAJ0KMK0AkWyvO4r63oEp19jOtXoD1iJdU/AQYA8n1S820ObisAAAAASUVORK5CYII="
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="md:px-10 lg:w-full w-full max-w-[600px] m-auto flex flex-col gap-4">
          <div>
            <h3 className="uppercase tracking-[0.2rem] font-semibold text-blue-600">
              About Flights
            </h3>
            <h1 className="text-[1.4rem] md:text-[3rem] font-bold text-balance leading-tight">
              <span className="text-blue-600">Experience</span> luxury travel on
              a <span className="text-blue-600">private jet</span>
            </h1>
          </div>
          <div>
            <p className="text-blue-600 font-semibold text-lg">
              There are many variations of passage of lorem available but the
              majority alteration
            </p>
          </div>
          <div>
            <p className="text-black/40">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              condimentum, lacus non faucibus congue, lectus quam viverra nulla,
              quis egestas neque sapien ac magna.
            </p>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div className="flex gap-2">
              <div className="h-[30px] w-[30px] bg-blue-600 flex justify-center items-center text-white rounded-full">
                <FaCheck />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Luxury flights</h3>
                <p className="text-black/40">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-[30px] w-[30px] bg-blue-600 flex justify-center items-center text-white rounded-full">
                <FaCheck />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Luxury flights</h3>
                <p className="text-black/40">Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="mt-5">
              <Button
                bgColor={"blue"}
                color={"white"}
                borderRadius={"12px"}
                text={"Travel With Us"}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <section className="bg-gradient-to-r from-white to-[#007aff] relative overflow-hidden py-28">
        <div className="relative z-10 bg-[#f7f6f0] rounded-3xl px-8 py-20 lg:px-32 lg:py-28">
          <h3 className="text-2xl text-[#1d4ed8]">Get Your Flight</h3>
          <h1 className="text-3xl lg:text-4xl text-[#05203d] font-bold mt-2 mb-8">
            Request for private flight
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input placeholder="Email" />
            <Input placeholder="Message" />
            <Button
              text="Submit"
              color="white"
              className="bg-[#2C4FD8] text-white rounded-lg"
              bgColor="#2C4FD8"
              borderRadius="12px"
            />
          </div>
          <img
            id="world"
            className="absolute top-0 right-2 z-0 h-full animate-movehorizontal"
            src={
              "http://localhost:2000/static/media/form-world.ee09a79ba583e69cc596.png"
            }
            alt=""
          />
        </div>
        <img
          id="plane"
          className="absolute top-28 -right-40 z-10 animate-movevertical hidden md:block"
          src={
            "http://localhost:2000/static/media/form-plane.9c4714c9a5be5d3b615d.png"
          }
          alt=""
        />
        <img
          id="plane2"
          className="absolute bottom-5 right-5 animate-movehorizontal"
          src={
            "http://localhost:2000/static/media/form-plane.9c4714c9a5be5d3b615d.png"
          }
          alt=""
        />
        <img
          id="rainbow"
          className="absolute top-2 left-32 animate-zoominout"
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATcAAADxCAYAAACu5PAvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM5MUUyMjMwMTI1QzExRURCRTcxOTJDNjFDNEFFRjAwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM5MUUyMjMxMTI1QzExRURCRTcxOTJDNjFDNEFFRjAwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzkxRTIyMkUxMjVDMTFFREJFNzE5MkM2MUM0QUVGMDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzkxRTIyMkYxMjVDMTFFREJFNzE5MkM2MUM0QUVGMDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4TgGl+AAAcYUlEQVR42uyd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"
          }
          alt=""
        />
      </section>
    </>
  );
}

export default About;
