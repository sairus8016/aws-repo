import './App.css';
import { Button, Text, Input, Label, SelectField, Flex, Heading, Table, TableCell, TableBody, TableHead, TableRow, Card, Tabs, Divider, Image, Link, TextAreaField } from "@aws-amplify/ui-react";
import { useCallback, useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { downloadData } from 'aws-amplify/storage';
import ResumePDF from "./Ben_Bates_Resume.pdf";
import styled from 'styled-components';

const client = generateClient();

const initialDiceValues = {
	equation: "",
	type: "Cumulative",
	output: ""
}

function App({ signOut }) {
  
  const[values, setValues] = useState(initialDiceValues);
  
  const handleInputChange = (e) => {
	const { name, value } = e.target;
	setValues({
		...values,
		[name]: value,
	});
  };
  
  const MyColumnHeader = () => {
	const clickHandler = () => {
		return <th class="sticky-col first-col" onClick={clickHandler}>Citrus</th>;
	}
	return <th class="sticky-col first-col" onClick={clickHandler}>Citrus</th>;
  }
  
  const openInNewTab = (url) => {
	window.open(url, "_blank", "noreferrer");
  };
  
  const rollDice = () => {
	var result = "";
	if (values.type == "Cumulative") { result = cumulativeRoll(); }
	else if (values.type == "Highest") { result = highestRoll(); }
	else if (values.type == "Lowest") { result = lowestRoll(); }
	setValues({
		...values,
		output: result,
	});
  };
  
  const cumulativeRoll = () => {
	
	
  };
  
  const highestRoll = () => {
	
	
  };
  
  const lowestRoll = () => {
	
	
  };
  
  const randomNumberInRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
	<Flex direction="column" gap="7px">
		<div class="centered name_header">
			<Heading level={1} fontWeight="bold">Benjamin Bates</Heading>
		</div>
		<div class="centered info_header">
			<Heading level={5} fontWeight="bold">benjaminbates92@gmail.com</Heading> | <Heading level={5} fontWeight="bold">(860)759-8778</Heading> | <Heading level={5} fontWeight="bold">East Hampton, CT 06424</Heading>
		</div>
		<Divider orientation="horizontal"></Divider>
		<Tabs.Container defaultValue="1">
			<Tabs.List justifyContent="flex-start">
				<Tabs.Item value="1">About Me</Tabs.Item>
				<Tabs.Item value="2">Coding Examples</Tabs.Item>
			</Tabs.List>
			<Tabs.Panel value="1">
				<Card>
					<Flex className="amplify-flex about_me_flex">
						<div class="ss_small_centered">
							<Image src="/Ben_Bates_Profile_Pic.jpg"></Image>
						</div>
						<div class="about_me_text_section">
							<Text as="p">
								Welcome to my website! I'm a web developer with 9 years of professional full stack experience. 
								During my time at Pharmaceutical Data Services I developed web applications for pharmaceutical and insurance companies.
								I developed applications through their full lifecycle, from concept and design, development, testing, implementation, and client updates.
								I've worked on both front end development and back end development using languages such as JavaScript, PHP, HTML, CSS, SQL, Python, and C#.
								The projects I worked on have required me to translate client needs to an end product that satisfies the client user experience.
							</Text>
							<br></br>
							<Text as="p">
								I've overcome every challenge in my career thanks to my ability to adapt and learn new technologies.
								I always jump at the chance to take on something new that will expand my skills and bring the best end result.
								I'm a problem solver who likes to create creative solutions, and I function well in a team or alone.
								I worked remotely at my previous job for 7 years, so I'm used to the experience of communicating with my coworkers and working independently in a remote setting.
								I'm looking for a job where I can use my experience to excel and also learn new things to expand my capabilities even further.
								I'm excited at the chance to show my skills and take on the next chapter of my career.
							</Text>
							<br></br>
							<Text as="p">
								You can find links to view my resume and visit my Linkedin below. 
							</Text>
							<div class="buttons_container">
								<a href={ResumePDF} target = "_blank" rel="noreferrer" download="Ben_Bates_Resume.pdf">
									<Button>Click here to see my resume</Button>
								</a>
								<Button role="link" onClick={() => openInNewTab("https://www.linkedin.com/in/bwbates")}>Click here to visit my Linkedin</Button>
							</div>
						</div>
					</Flex>	
				</Card>
			</Tabs.Panel>
			<Tabs.Panel value="2">
				<Card>
					<div class="wrapper">
						<Table
						  caption=""
						  highlightOnHover={false}
						  variation="striped">
						  <TableHead>
						    <TableRow>
							 <th class="sticky-col first-col">Citrus</th>
							 <th class="sticky-col second-col">Stone Fruit</th>
							 <th class="sticky-col third-col">Berry</th>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
							 <TableCell as="th">Stone Fruit</TableCell>
							 <TableCell as="th">Berry</TableCell>
						    </TableRow>
						  </TableHead>
						  <TableBody>
						    <TableRow>
							 <TableCell class="sticky-col first-col">Orange</TableCell>
							 <TableCell class="sticky-col second-col">Nectarine</TableCell>
							 <TableCell class="sticky-col third-col">Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
							 <TableCell>Nectarine</TableCell>
							 <TableCell>Raspberry</TableCell>
						    </TableRow>
						    <TableRow>
							 <TableCell class="sticky-col first-col">Grapefruit</TableCell>
							 <TableCell class="sticky-col second-col">Apricot</TableCell>
							 <TableCell class="sticky-col third-col">Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
							 <TableCell>Apricot</TableCell>
							 <TableCell>Blueberry</TableCell>
						    </TableRow>
						    <TableRow>
							 <TableCell class="sticky-col first-col">Lime</TableCell>
							 <TableCell class="sticky-col second-col">Peach</TableCell>
							 <TableCell class="sticky-col third-col">Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
							 <TableCell>Peach</TableCell>
							 <TableCell>Strawberry</TableCell>
						    </TableRow>
						  </TableBody>
						</Table>
					</div>
				</Card>
				<div id='dice_roller_section' class='hidden'>
					<div class="inline-block">
						<Label htmlFor="roll_equation">Dice Roll:</Label>
						<Input id="roll_equation" name="equation" value={values.equation} onChange={handleInputChange}/>
						<SelectField label="Result Type" name="type" value={values.type} onChange={handleInputChange}>
							<option value="cumulative">Cumulative</option>
							<option value="highest">Highest</option>
							<option value="lowest">Lowest</option>
						</SelectField>
						<Button onClick={ () => rollDice() }>Roll!</Button>
						<TextAreaField isReadOnly={true} label="Results" name="results" rows={2} name="output" value={values.output}/>
					</div>
					
				</div>
			</Tabs.Panel>
		</Tabs.Container>
	</Flex>
  );
}

export default App;