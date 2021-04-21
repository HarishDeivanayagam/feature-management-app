import { useAtom } from "jotai";
import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import AppContainer from "../components/AppContainer";
import feedbackAtom from "../data/feedbackData";
import segmentAtom from "../data/segmentData";

  

function Analytics() {

    const [feedbackData] = useAtom(feedbackAtom);
    const [segmentData] = useAtom(segmentAtom);

    const [loaded, setLoaded] = React.useState<boolean>(false);

    const segmentInformation = (feedbackData:Array<any>, segmentData:Array<any>) => {

        let sid = new Map()
        let label:Array<any> = ["Unsegmented"]
        let data:Array<any> = []

        sid.set(-1, 0)

        segmentData.forEach((elm:any,)=>{
            sid.set(elm.id, 0)
            label.push(elm.name)
        })

        feedbackData.forEach((elm:any,) => {
            if(!elm.segment) {
                let temp = sid.get(-1);
                sid.set(-1, temp + elm.count)    
            } else {
                let temp = sid.get(elm.segment);
                sid.set(elm.segment, temp + elm.count)    
            }

        })

        sid.forEach((val:any, key:any)=>{
            data.push(val+1)
        })

        return {
            labels: label,
            datasets: [
              {
                label: '# Segment Information',
                data: data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
        }
          
    }

    const mostRequested = (feedbackData:Array<any>, segmentData:Array<any>) => {

        let count:Array<any> = []
        let label:Array<any> = []


        feedbackData.forEach((elm:any,) => {
            count.push(elm.count);
            label.push(elm.feedback);

        })

        return {
            labels: label,
            datasets: [
              {
                label: '# Most upvoted',
                data: count,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
        }
          
    }

    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
    }
      


    React.useEffect(()=>{
        if(feedbackData.length > 1) {
            setLoaded(true);  
        }
    },[])

    if(!loaded) return (
        <AppContainer path="/analytics">
            <h4>Unable to load analytics</h4>
        </AppContainer>
    )

    return (
        <AppContainer path="/analytics">
            <h4>Analytics</h4>
            <div className="flex justify-between p-4">
                <div className="w-1/2 mr-2 bg-gray-100 p-4">
                    <h4>Segment Information</h4>
                    <Pie data={segmentInformation(feedbackData, segmentData)} width={100} height={100} options={{ maintainAspectRatio: false }}/>
                </div>
                <div className="w-1/2 ml-2 bg-gray-100 p-4">
                    <h4>Most Requested Features</h4>
                    <Bar data={mostRequested(feedbackData, segmentData)} options={options} />
                </div>
            </div>
        </AppContainer>
    )
}

export default Analytics;
