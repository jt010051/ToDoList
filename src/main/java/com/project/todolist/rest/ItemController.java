package com.project.todolist.rest;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.todolist.domain.Item;
import com.project.todolist.service.ItemService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/items")
@Slf4j 
@RequiredArgsConstructor
public class ItemController {
		public final ItemService service;
		
		
		@PostMapping("/create/{item}")
		public Item createItem(@PathVariable String item) {
			Item thisItem = service.createItem(item);
			
			return thisItem;
		}
		
		@GetMapping("/allItems")
		public List<Item> getALlItems(){
			return service.allItems();
		}
		@PutMapping("/editItem/{newItem}/{oldItem}")
		public void editItem(@PathVariable String newItem, 
				@PathVariable String oldItem) {
			service.editItemName(newItem, oldItem);
		}
		@DeleteMapping("delete/{item}")
		public void deleteItem(@PathVariable String item) {
			service.deleteItem(item);
		}
		@PutMapping("/setMarked/{item}")
		public void setMarked(@PathVariable String item) {
			service.markItem(item);
		}
}
