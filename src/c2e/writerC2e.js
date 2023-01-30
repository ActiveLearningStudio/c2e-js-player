import React, { useEffect, useState } from "react";
import JSZip from "jszip";
// import H5PEditor from './components/H5PEditor';
import { saveAs } from "file-saver";
import { schema } from "./sample.js";

function WriterC2e() {
  // const [contentData, setcontentData] = useState();
  // const [contentDetail, setcontentDetail] = useState(null);
  // const [projectJSON, setProjectJSON] = useState(null);
  // const [activityh5p, setActivityh5p] = useState(null);
  const [c2eSchema, setc2eSchema] = useState(schema);
  var zip = new JSZip();
  // const returnIndex = (filename) => {
  //   return contentData.indexOf(
  //     contentData.filter((data, counter) =>
  //       data.includes(filename)
  //     )?.[0]
  //   );
  // };
  // useEffect(()=>{
  //   var zip = new JSZip();
  //   zip.file("hello.txt", "Hello World\n");
  //   zip.generateAsync({type:"blob"}).then(data=>{
  //     saveAs(data)
  //   })

  // },[])
  const setPath = (data, counter, all) => {
    let duy = "";
    for (var i = 0; i < counter; i++) {
      duy = duy + all[i] + "/";
    }
    return duy;
  };
  return (
    <div className="App">
      <h2>C2E writer</h2>
      <div className="">
        <input
          type="file"
          onChange={async (e) => {
            const loadzip = await JSZip.loadAsync(e.target.files[0]); // 1) read the Blob

            const contents = [];
            // const contentsDetail = [];
            let dummyArray = [];

            loadzip.forEach((relativePath, zipEntry) => {
              contents.push(zipEntry.name);
            });
            for (var j = 0; j < contents.length; j++) {
              const fg = contents[j].split("/");

              for (var i = 0; i < fg.length; i++) {
                if (!fg[i]?.includes(".")) {
                  dummyArray = [...dummyArray, setPath(fg[i], i, fg) + fg[i]];
                } else {
                  console.log(fg.join("/"));
                  const filepathContent = await loadzip.files[fg.join("/")].async("text");

                  zip.file(fg.join("/"), filepathContent);
                }
              }
            }

            const removeDuplicate = new Set(dummyArray);
            const allPaths = Array.from(removeDuplicate);
            console.log("allPaths", allPaths);
            //root path linking
            const rootprojectSchema = JSON.parse(JSON.stringify(schema));
            const playlistSchema = JSON.parse(JSON.stringify(schema));
            if (rootprojectSchema) {
              let rootcompoPath = {
                "@id": "c2ens:c2eid-xxx-2",
                "@type": "C2E",
                "@index": "2",
                name: "project name",
                c2eType: "H5P",
                subManifest: `./playlists/c2e.json`,
              };

              rootprojectSchema?.c2eContain[1]?.c2eComponents?.push(rootcompoPath);
              zip.file(`c2e.json`, JSON.stringify(rootprojectSchema));
            }

            //playlist submenifest linking
            if (playlistSchema) {
              allPaths?.forEach((filePath) => {
                if (filePath !== "playlists" && !filePath.includes("/activities")) {
                  let c2ecompo = {
                    "@id": j,
                    "@type": "C2E",
                    "@index": "2",
                    name: filePath,
                    c2eType: "H5P",
                    subManifest: `./${filePath}/c2e.json`,
                  };

                  playlistSchema.c2eContain[1].c2eComponents.push(c2ecompo);
                }
              });
            }
            console.log("playlistSchema", playlistSchema);
            allPaths?.forEach((filePath) => {
              if (filePath === "playlists") {
                // schema.c2eContain[1].c2eComponents[1].subManifest = `./${filePath}/c2e.json`;
                // console.log("updatedc2e", playlistSchema);
                zip.file(`${filePath}/c2e.json`, JSON.stringify(playlistSchema));
              } else {
                zip.file(`${filePath}/c2e.json`, JSON.stringify(schema));
              }
            });

            // zip.generateAsync({ type: "blob" }).then((data) => {
            //   saveAs(data);
            // });

            // setcontentData(contents);
            // for (var i = 0; i < contents.length; i++) {
            //   const contentRead = await loadzip.files[contents[i]].async(
            //     'text'
            //   );
            //   contentsDetail.push(contentRead);
            //   if (contents[i].includes('project.json')) {
            //     setProjectJSON(JSON.parse(contentRead));
            //   }
            // }
            // setcontentDetail(contentsDetail);
          }}
        />
      </div>

      {/* {contentData && (
        <>
          <p>
            There are <strong>{contentData?.length}</strong> files found in
            given zip
          </p>
          <div className="contentScroll">
            {contentData?.map((data, counter) => {
              return (
                <>
                  <h6>{contentData[counter]}</h6>
                  <p>{data}</p>
                </>
              );
            })}
          </div>
        </>
      )} */}
      {/* <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '10px',

        }}
      >
        {projectJSON?.playlists.map((playlist) => {
          return (
            <div key={playlist.id} className="playlist-wrapper"  style={{
              background:'#fff',
              border: '1px solid #ccc',
              padding: '15px',
            }}>
              <h4>{playlist.title}</h4>
              <div className="activitylist-wrapper"  >
                {playlist?.activities.map((activity) => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                      key={activity.id}
                      onClick={() =>
                        setActivityh5p(
                          JSON.parse(
                            contentDetail[
                              returnIndex(`${activity.h5p_content_id}-h5p.json`)
                            ]
                          )
                        )
                      }
                    >
                      <img
                        style={{ width: '50px' }}
                        src={activity.thumb_url}
                        alt=""
                      />
                      <p>{activity.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <H5PEditor h5p={activityh5p} /> */}
    </div>
  );
}

export default WriterC2e;
