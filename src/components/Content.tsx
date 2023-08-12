import { useState } from "react";
import moment from 'moment';

import { useColorScheme } from "@mui/joy/styles";
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';

export default function Content(){
    const { setMode } = useColorScheme();
    const [ result, setResult ] = useState('');
    const [ loanAmount, setLoanAmount ] = useState(415000);
    const [ interestRate, setInterestRate ] = useState(7.0);
    const [ repayment, setRepayment ] = useState(600);

    setMode('dark');

    function calculate() {
        let sumOwed = loanAmount
        let firstDay = moment("October 15, 2020")
        let currentDay = moment(firstDay)
        while(sumOwed > 0) {
            // Calculate interest
            let interest = sumOwed * interestRate / 100 / 365
            sumOwed = sumOwed + interest

            // Make repayments on mondays
            if(currentDay.day() === 2) {
                sumOwed = sumOwed - repayment
            }


            currentDay = currentDay.add(1, 'day')
        }
        let diff = currentDay.diff(firstDay, 'years')
        setResult(`Mortgage repayed in ${diff} years on ${currentDay.toLocaleString()}`)
    }

    return (
        <Sheet>
            Loan amount: <Input defaultValue={loanAmount} onChange={(event) => setLoanAmount(parseInt(event.currentTarget.value))}/>
            <br/>
            Weekly repayment: <Input defaultValue={repayment} onChange={(event) => setRepayment(parseInt(event.currentTarget.value))}/>
            <br/>
            Interest Rate: <Input defaultValue={interestRate} onChange={(event) => setInterestRate(parseFloat(event.currentTarget.value))}/>

            <Button onClick={calculate}>Calculate</Button>

            <br/>
            Result
            <br/>
            {result}
        </Sheet>
    )    
}