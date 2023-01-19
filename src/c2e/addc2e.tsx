import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import H5PEditor from "../components/H5PEditor";
import { Link } from "react-router-dom";

function AddC2e() {
  const [contentData, setcontentData] = useState<any>();
  const [contentDetail, setcontentDetail] = useState<any>(null);
  const [projectJSON, setProjectJSON] = useState<any>(null);
  const [activityh5p, setActivityh5p] = useState<any>(null);

  const returnIndex = (filename: any) => {
    return contentData.indexOf(
      contentData.filter((data: any, counter: any) => data.includes(filename))?.[0]
    );
  };
  return (
    <div className="App">
      <h2><Link to="myC2e">Offline C2E file</Link></h2>
      <h2>Upload C2E file</h2>

      <div className="">
        <input
          type="file"
          onChange={async (e: any) => {
            console.log("name", e.target.files);
            const loadzip = await JSZip.loadAsync(e.target.files[0]); // 1) read the Blob
            console.log(loadzip);
            const contents: any = [];
            const contentsDetail: any = [];
            loadzip.forEach((relativePath: any, zipEntry: any) => {
              contents.push(zipEntry.name);
            });
            setcontentData(contents);
            for (var i = 0; i < contents.length; i++) {
              const contentRead = await loadzip.files[contents[i]].async("text");
              contentsDetail.push(contentRead);
              if (contents[i].includes("project.json")) {
                setProjectJSON(JSON.parse(contentRead));
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
        {projectJSON?.playlists.map((playlist: any) => {
          return (
            <div
              key={playlist.id}
              className="playlist-wrapper"
              style={{
                background: "#fff",
                border: "1px solid #ccc",
                padding: "15px",
              }}
            >
              <h4>{playlist.title}</h4>
              <div className="activitylist-wrapper">
                {playlist?.activities.map((activity: any) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                      key={activity.id}
                      onClick={() =>
                        setActivityh5p(
                          JSON.parse(
                            contentDetail[returnIndex(`${activity.h5p_content_id}-h5p.json`)]
                          )
                        )
                      }
                    >
                      <img style={{ width: "50px" }} src={activity.thumb_url} alt="" />
                      <p>{activity.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <H5PEditor h5p={activityh5p} />
    </div>
  );
}

export default AddC2e;
