import { useState } from "react";
import moment from 'moment';

import { useColorScheme } from "@mui/joy/styles";
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';

function daysInYear(year: number) {
    return ((year % 4 === 0 && year % 100 > 0) || year % 400 === 0) ? 366 : 365;
}

export default function Content(){
    const { setMode } = useColorScheme();
    const [ result, setResult ] = useState('');
    const [ loanAmount, setLoanAmount ] = useState(415000);
    const [ interestRate, setInterestRate ] = useState(7.0);
    const [ repayment, setRepayment ] = useState(600);
    const [ events, setEvents ] = useState([]);

    setMode('dark');

    function calculate() {
        let sumOwed = loanAmount
        let firstDay = moment("October 15, 2020")
        let currentDay = moment(firstDay)
        let totalInterest = 0
        let currentInterestRate = interestRate
        let currentRepayment = repayment

        let events = [
            {
                type: "SetRepayment",
                value: currentRepayment,
                date: "2020-10-15"
            },
            // {
            //     type: "SetInterestRate",
            //     value: 1.9,
            //     date: "2020-10-15"
            // },
            // {
            //     type: "SetInterestRate",
            //     value: 2.9,
            //     date: "2021-10-15"
            // },
            // {
            //     type: "SetRepayment",
            //     value: 600,
            //     date: "2021-10-15"
            // },
            // {
            //     type: "SetInterestRate",
            //     value: 8.0,
            //     date: "2023-10-15"
            // },
            // {
            //     type: "PayLumpSum",
            //     value: 30000,
            //     date: "2023-10-15"
            // },
            // {
            //     type: "SetRepayment",
            //     value: 800,
            //     date: "2023-10-15"
            // },
            // {
            //     type: "SetInterestRate",
            //     value: 5.0,
            //     date: "2025-10-15"
            // },
        ]

        while(sumOwed > 0) {

            // Sanity check
            if (currentDay.year() > 2100) {
                console.log('Something went wrong')
                break
            }

            // Apply events
            // eslint-disable-next-line no-loop-func
            events.forEach((event) => {
                if(currentDay.isSame(event.date)) {
                    console.log(`Applying event ${event.type} to ${event.value}`)
                    if(event.type === 'SetInterestRate') {
                        currentInterestRate = event.value
                    }
                    else if(event.type === 'SetRepayment') {
                        currentRepayment = event.value
                    }
                    else if(event.type === 'PayLumpSum') {
                        sumOwed = sumOwed - event.value
                    }
                }
            })


            // Calculate interest
            let interest = sumOwed * currentInterestRate / 100 / daysInYear(currentDay.year())
            sumOwed = sumOwed + interest

            totalInterest = totalInterest + interest

            // Make repayments on mondays
            if(currentDay.day() === 2) {
                sumOwed = sumOwed - currentRepayment
            }


            currentDay = currentDay.add(1, 'day')
        }
        let diff = currentDay.diff(firstDay, 'years')
        setResult(
            `Mortgage repayed in ${diff} years on ${currentDay.toLocaleString()}\n
            Total interests paid: $${Math.round(totalInterest)}
        `)
    }

    return (
        <Sheet>
            Loan amount: <Input defaultValue={loanAmount} onChange={(event) => setLoanAmount(parseInt(event.currentTarget.value))}/>
            <br/>
            Weekly repayment: <Input defaultValue={repayment} onChange={(event) => setRepayment(parseInt(event.currentTarget.value))}/>
            <br/>
            Interest Rate: <Input defaultValue={interestRate} onChange={(event) => setInterestRate(parseFloat(event.currentTarget.value))}/>

            <b>Add Event</b>

            <br/>
            <Button onClick={calculate}>Calculate</Button>
            <br/>

            Result
            <br/>
            {result}
        </Sheet>
    )    
}