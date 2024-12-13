import './App.css';
import { Button, Text, Input, Label, SelectField, Flex, Heading, Table, TableCell, TableBody, TableHead, TableRow, Card, Tabs, Divider, Image, Link, TextAreaField } from "@aws-amplify/ui-react";
import { useCallback, useEffect, useState, React, useRef } from 'react';
import { downloadData } from 'aws-amplify/storage';
import ResumePDF from "./Ben_Bates_Resume.pdf";
import styled from 'styled-components';
import Grid from './Grid.js';
import Tile from './Tile.js';

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
  
  
  useEffect(() => {
	const gameBoard = document.getElementById("game-board");
	var xDown = null;
	var yDown = null;
	
	const grid = new Grid(gameBoard);
	grid.randomEmptyCell().tile = new Tile(gameBoard);
	grid.randomEmptyCell().tile = new Tile(gameBoard);
	setupInput();
	
	function setupInput() {
		window.addEventListener("keydown", handleInput, { once: true });
		window.addEventListener('touchstart', handleTouchStart, { once: true });
		window.addEventListener('touchmove', handleTouchMove, { once: true });
	}
	
	function getTouches(evt) {
		return evt.touches ||             // browser API
			evt.originalEvent.touches; // jQuery
	}                                                     
															   
	function handleTouchStart(evt) {
		const firstTouch = getTouches(evt)[0];                                      
		xDown = firstTouch.clientX;                                      
		yDown = firstTouch.clientY;                                      
	}                                           
															   
	async function handleTouchMove(evt) {
		if ( ! xDown || ! yDown ) {
			setupInput();
			return;
		}

		var xUp = evt.touches[0].clientX;                                    
		var yUp = evt.touches[0].clientY;

		var xDiff = xDown - xUp;
		var yDiff = yDown - yUp;
															   
		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			if ( xDiff > 0 ) {
				if (!canMoveLeft()) {
					setupInput();
					return;
				}
				await moveLeft();
			} else {
				if (!canMoveRight()) {
					setupInput();
					return;
				}
				await moveRight();
			}                       
		} else {
			if ( yDiff > 0 ) {
				if (!canMoveUp()) {
					setupInput();
					return;
				}
				await moveUp();
			} else { 
				if (!canMoveDown()) {
					setupInput();
					return;
				}
				await moveDown();
			}                                                                 
		}
		/* reset values */
		xDown = null;
		yDown = null;  

		grid.cells.forEach(cell => cell.mergeTiles());
		
		const newTile = new Tile(gameBoard);
		grid.randomEmptyCell().tile = newTile;
		
		if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
			newTile.waitForTransition(true).then(() => {
				alert("You lose");
			})
			return;
		}
		
		setupInput();
	}
	  
	async function handleInput(e) {
		switch (e.key) {
			case "ArrowUp":
				if (!canMoveUp()) {
					setupInput();
					return;
				}
				await moveUp();
				break;
			case "ArrowDown":
				if (!canMoveDown()) {
					setupInput();
					return;
				}
				await moveDown();
				break;
			case "ArrowLeft":
				if (!canMoveLeft()) {
					setupInput();
					return;
				}
				await moveLeft();
				break;
			case "ArrowRight":
				if (!canMoveRight()) {
					setupInput();
					return;
				}
				await moveRight();
				break;
			default:
				setupInput();
				return;
		}
		
		grid.cells.forEach(cell => cell.mergeTiles());
		
		const newTile = new Tile(gameBoard);
		grid.randomEmptyCell().tile = newTile;
		
		if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
			newTile.waitForTransition(true).then(() => {
				alert("You lose");
			})
			return;
		}
		
		setupInput();
	}
	
	function moveUp() {
		return slideTiles(grid.cellsByColumn);
	}
	
	function moveDown() {
		return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()));
	}
	
	function moveLeft() {
		return slideTiles(grid.cellsByRow);
	}
	
	function moveRight() {
		return slideTiles(grid.cellsByRow.map(row => [...row].reverse()));
	}
	
	function slideTiles(cells) {
		return Promise.all(
			cells.flatMap(group => {
				const promises = [];
				for (let i = 1; i < group.length; i++) {
					const cell = group[i];
					if (cell.tile == null) continue;
					let lastValidCell;
					for (let j = i - 1; j >= 0; j--) {
						const moveToCell = group[j];
						if (!moveToCell.canAccept(cell.tile)) break;
						lastValidCell = moveToCell;
					}
					
					if (lastValidCell != null) {
						promises.push(cell.tile.waitForTransition())
						if (lastValidCell.tile != null) {
							lastValidCell.mergeTile = cell.tile;
						} else {
							lastValidCell.tile = cell.tile;
						}
						cell.tile = null;
					}
				}
				return promises;
			})
		)
	}
	
	function canMoveUp() {
		return canMove(grid.cellsByColumn);
	}
	
	function canMoveDown() {
		return canMove(grid.cellsByColumn.map(column => [...column].reverse()));
	}
	
	function canMoveLeft() {
		return canMove(grid.cellsByRow);
	}
	
	function canMoveRight() {
		return canMove(grid.cellsByRow.map(row => [...row].reverse()));
	}
	
	function canMove(cells) {
		return cells.some(group => {
			return group.some((cell, index) => {
				if (index === 0) return false;
				if (cell.tile == null) return false;
				const moveToCell = group[index - 1];
				return moveToCell.canAccept(cell.tile);
			})
		})
	}
  }, []);

  return (
	<Flex direction="column" gap="7px">
		<div class="centered name_header">
			<Heading level={3} fontWeight="bold">Benjamin Bates</Heading>
		</div>
		<div class="centered info_header">
			<Heading level={5} fontWeight="bold">benjaminbates92@gmail.com</Heading><Heading level={5} fontWeight="bold">(860)759-8778</Heading>
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
								Welcome to my website! I'm a passionate Software Engineer with a Bachelor's Degree in Computer Science and 9 years of full-stack development experience, 
								now eager to transition into Video Game Development. Throughout my career, I've worked on diverse projects, from developing web applications 
								for pharmaceutical and insurance companies to building interactive user experiences. My skills span both front-end and back-end development, 
								utilizing languages like JavaScript, PHP, HTML, CSS, SQL, Python, and C#.
							</Text>
							<br></br>
							<Text as="p">
								My experience has honed my ability to translate complex requirements into engaging, user-friendly products. I've always embraced opportunities 
								to learn and innovate, applying my adaptability and problem-solving skills to create creative solutions. This drive is mirrored in my passion for video games, 
								where I constantly analyze gameplay mechanics and user experiences, seeking inspiration for my own projects.
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
				<div class="hidden">
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
				</div>
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
				<div id="game-section">
					<div id="game-board"></div>
				</div>
				<div class="game_rules">
					<Text as="p">
						Use the Arrow Keys or swipe to move the tiles. Match like numbers until you can't make any moves.
					</Text>
				</div>
			</Tabs.Panel>
		</Tabs.Container>
	</Flex>
  );
}

export default App;