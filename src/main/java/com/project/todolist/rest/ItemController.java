package com.project.todolist.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.todolist.domain.Item;
import com.project.todolist.domain.ListOfItems;
import com.project.todolist.service.ItemService;
import com.project.todolist.service.ListService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/items")
@Slf4j 
@RequiredArgsConstructor
public class ItemController {
	public final ItemService service;
	
	
	@GetMapping("/allItems")
	public List<Item> getAllItems(){
		return service.allItems();
	}
	@GetMapping("/get/{id}")
	public Item getItem (@PathVariable Long id) {
		return service.getItem(id);
	}
	@PostMapping("/create/{itemName}/{id}")
	public ResponseEntity<Item> createItem (@PathVariable String itemName, 
			@PathVariable Long id){
		service.createItem(itemName, id);
		  return ResponseEntity.ok().build();
	}
	@PutMapping("/edit")
	public ResponseEntity<Item> editItem(@RequestBody Item item){
		service.editItem(item);
		return ResponseEntity.ok().build();
	}
	@DeleteMapping("/delete/{id}")
	public void deleteItem(@PathVariable Long id) {
		service.deleteItem(id);
	}
	@PutMapping("/mark/{id}")
	public void markItem(@PathVariable Long id){
		service.markItem(id);
	}
		
}
