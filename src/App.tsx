import React, { useEffect, useState } from 'react';
import './App.css';
import JSZip from 'jszip';

function App() {
  const [contentData, setcontentData] = useState<any>();
  const [contentDetail, setcontentDetail] = useState<any>(null);
  return (
    <div className="App">
      <h2>Upload C2E file</h2>
      <div className="">
        <input
          type="file"
          onChange={async (e: any) => {
            console.log('name', e.target.files);
            const loadzip = await JSZip.loadAsync(e.target.files[0]); // 1) read the Blob
            console.log(loadzip);
            const contents: any = [];
            const contentsDetail: any = [];
            loadzip.forEach((relativePath: any, zipEntry: any) => {
              contents.push(zipEntry.name);
            });
            setcontentData(contents);
            for (var i = 0; i < contents.length; i++) {
              const contentRead = await loadzip.files[contents[i]].async(
                'text'
              );
              contentsDetail.push(contentRead);

            }
            setcontentDetail(contentsDetail);
          }}
        />
      </div>
      {/* {contentData(()=>{
        return (

        )

      })} */}
      {contentData && (
        <>
          <p>
            There are <strong>{contentData?.length}</strong> files found in
            given zip
          </p>
          <div className="contentScroll">
          {contentDetail?.map((data:any, counter:number) => {
            return (
              <>
              <h6>{contentData[counter]}</h6>
              <p>{data}</p>
              </>
            )
          })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
