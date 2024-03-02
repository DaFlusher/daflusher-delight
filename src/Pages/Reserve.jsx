import { useReducer, useState } from "react";
import { Box, Button, Heading, Input, Select, Stack, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";


const availableTimesReducer=(state, action)=>{
    switch(action.type){
        case 'UPDATE_TIME': 
        return action.payload;
        default: return state;
    }
    
}

//reducer functions
const updateTimes=(dispatch,date)=>{

    const updatedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    dispatch({ type: 'UPDATE_TIMES', payload: updatedTimes });
}

const initalizeTimes=()=>{
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}


export default function Reserve() {
    
    //state
	const [date, setDate]= useState('');
	const [time, setTime]= useState([]);
	const [guests, setGuests]= useState(1);
	const [occasion, setOccasion]= useState('Birthday');
    const availableTimes= ['17:00','18:00','19:00', '20:00', '21:00', '22:00']
    const [availableTime, dispatch]= useReducer(availableTimesReducer, initalizeTimes);
    const [submit, setSubmit]= useState(false)

    //change handlers
    const handleTimeChange=({target})=>{
        
		const {name, value}= target;
		setTime((prev)=>({...prev, [name]:value}));

    }

    const handleDateChange=(e)=>{
        const { value } = e.target;
        setDate(value);
        // Dispatch state change when the date field is changed
        updateTimes(dispatch, value);
    }

    const handleGuestsChange=(e)=>{
        setGuests(e.target.value)
    }

    const handleOccasionChange=(e)=>{
        setOccasion(e.target.value)
    }


    //submit handler
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(date && time && guests && occasion){
            setSubmit(true)
        }
    }
    
  return (
    <div>
        <NavBar/>
        {
            !submit? (<Stack as='form' maxWidth={{base:'80%', md:'50%', xl:'40%'}} margin='0 auto' p={{base:'20px', md:'32px'}} onSubmit={handleSubmit}>
            <Heading fontSize={{base:'1.5rem', lg:'2rem'}} textAlign='center' color='#495e57'>Reserve a Table</Heading>
            <Box p='16px 0'>
                <Text as='label' htmlFor="date" fontWeight='600' fontSize={{base:'18px', md:'20px'}} color='gray.700'>Please choose a date</Text>
                <Input placeholder='date' name="date" type='date' variant='flushed' id='date' value={date} onChange={handleDateChange}/>
                {/* <Text>{date}</Text> */}
            </Box>

            <Box p='16px 0'>
                <Text as='label' htmlFor="time" fontWeight='600' fontSize={{base:'18px', md:'20px'}} color='gray.700'>Please choose a time</Text>
                <Select id='time' name="time" variant='flushed' onChange={handleTimeChange} value={time.time}>
                    {
                        availableTimes.map((availableTime, i)=>(
                            <option key={i} value={availableTime}>{availableTime}</option>
                        ))
                    }
                </Select>
                {/* <Text>{time.time}</Text> */}
            </Box>

            <Box p='16px 0'>
                <Text as='label' htmlFor="guests" fontWeight='600' fontSize={{base:'18px', md:'20px'}} color='gray.700'>Number of guests</Text>
                <Input placeholder='2' type='number' name="guests" value={guests} onChange={handleGuestsChange} variant='flushed' id='guests' min={1} max={10} aria-describedby="guest-number" />
                <Box as='span' fontSize={{base:'12px', md:'14px'}} fontWeight='500' color='gray.700'>1-10 guests allowed</Box>
                {/* <Text>{guests}</Text> */}
            </Box>

            <Box p='16px 0'>
                <Text as='label' htmlFor="occasion" fontWeight='600'  fontSize={{base:'18px', md:'20px'}} color='gray.700'>Occasion</Text>
                <Select id='occasion' variant='flushed' name='occasion' value={occasion} onChange={handleOccasionChange}>
                    <option value='Birthday'>Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                </Select>
                {/* <Text>{occasion}</Text> */}
            </Box>

            <Button colorScheme="yellow" type="submit">Submit</Button>

            
        </Stack>):
        (<Stack as='article'  maxWidth={{base:'80%', md:'50%', xl:'40%'}} margin='0 auto' p={{base:'20px', md:'32px'}}>
                
                <Heading fontSize={{base:'1.5rem', lg:'2rem'}} textAlign='center' color='#495e57' p='16px 0'>Reservations</Heading>
                <Box borderTop='8px solid #f4ce14' p='16px' borderRadius='8px' boxShadow='0px 0px 10px #495e57' textAlign='center'>
                <Box p='16px 0'>
                    <Box as="span" fontWeight='600'>Date:</Box>
                    <Text fontSize={{ md:'20px'}}>{date}</Text>
                </Box>

                <Box p='16px 0'>
                    <Box as="span" fontWeight='600'>Time:</Box>
                    <Text fontSize={{ md:'20px'}}>{time.time}</Text>
                </Box>

                <Box p='16px 0'>
                    <Box as="span" fontWeight='600'>Number of guests:</Box>
                    <Text fontSize={{ md:'20px'}}>{guests}</Text>
                </Box>

                <Box p='16px 0'>
                    <Box as="span" fontWeight='600'>Occasion:</Box>
                    <Text fontSize={{ md:'20px'}}>{occasion}</Text>
                </Box>

                </Box>
                
        </Stack>)
        }
        

        
    </div>
  )
}
