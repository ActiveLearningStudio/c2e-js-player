import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import H5PEditor from "../components/H5PEditor";
import { Link } from "react-router-dom";

function C2eJsonLd() {
  const [contentData, setcontentData] = useState<any>();
  const [contentDetail, setcontentDetail] = useState<any>(null);
  const [projectJSON, setProjectJSON] = useState<any>(null);
  const [activityh5p, setActivityh5p] = useState<any>(null);
  const [activityJSON, setactivityJSON] = useState<any>(null);
  const returnIndex = (filename: any) => {
    return contentData.indexOf(
      contentData.filter((data: any, counter: any) => data.includes(filename))?.[0]
    );
  };
  console.log("contentDetail", contentDetail);
  return (
    <div className="App">
      <h2>
        <Link to="myC2e">Upload YOUR C2E json LD</Link>
      </h2>
      <h2>Upload C2E file</h2>

      <div className="">
        <input
          type="file"
          onChange={async (e: any) => {
            console.log("name", e.target.files);
            const loadzip = await JSZip.loadAsync(e.target.files[0]); // 1) read the Blob
            console.log("loadzip", loadzip);
            const contents: any = [];
            const contentsDetail: any = [];
            loadzip.forEach((relativePath: any, zipEntry: any) => {
              contents.push(zipEntry.name);
            });
            console.log("contents", contents);
            setcontentData(contents);
            for (var i = 0; i < contents.length; i++) {
              const contentRead = await loadzip.files[contents[i]].async("text");
              contentsDetail.push(contentRead);
              if (contents[i].includes("c2e-playlist.json")) {
                setProjectJSON(JSON.parse(contentRead));
              }
              if(contents[i].includes("c2e-activity.json")){
                setactivityJSON(JSON.parse(contentRead))
              }
            }
            setcontentDetail(contentsDetail);
          }}
        />
      </div>

      {/* {


      } */}
      {/* {contentData(()=>{
        return (

        )

      })} */}
      {contentData && (
        <>
          <p>
            There are <strong>{contentData?.length}</strong> files found in given zip
          </p>
          {/* <div className="contentScroll">
            {contentDetail?.map((data: any, counter: number) => {
              return (
                <>
                  <h6>{contentData[counter]}</h6>
                  <p>{data}</p>
                </>
              );
            })}
          </div> */}
        </>
      )}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        {projectJSON?.c2eContain[1]?.c2eComponents?.map((playlist: any,key:number) => {
          return (
            <div
              key={key}
              className="playlist-wrapper"
              style={{
                background: "#fff",
                border: "1px solid #ccc",
                padding: "15px",
              }}
            >
              <h4>{playlist.name}</h4>

              {/* {playlist.subManifest === `${playlist.name}/c2e-activity.json` && ( */}
                <div className="activitylist-wrapper">
                  {activityJSON?.c2eContain[1]?.c2eComponents?.map((activity: any,key:number) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                        key={key}
                          onClick={() =>
                            setActivityh5p(
                              JSON.parse(
                                contentDetail[returnIndex(`${activity.h5p_content_id}-h5p.json`)]
                              )
                            )
                          }
                      >
                        <img style={{ width: "50px" }} src="curriki.png" alt="" />
                        <p>{activity.name}</p>
                      </div>
                    );
                  })}
                </div>
              {/* )} */}
            </div>
          );
        })}
      </div>
      <H5PEditor h5p={activityh5p} />
    </div>
  );
}

export default C2eJsonLd;
