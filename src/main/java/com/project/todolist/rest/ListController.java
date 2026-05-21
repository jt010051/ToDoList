package com.project.todolist.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.todolist.domain.Item;
import com.project.todolist.domain.ListOfItems;
import com.project.todolist.service.ItemService;
import com.project.todolist.service.ListService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/lists")
@Slf4j 
@RequiredArgsConstructor
public class ListController {
public final ListService service;
	@PostMapping("/create/{thisList}")
	public ListOfItems createItem(@PathVariable String thisList) {
		ListOfItems list = service.createList(thisList);
		
		return list;
	}
	@GetMapping("/allLists")
	public List<ListOfItems> getAllLists(){
		return service.getAllLists();
	}
	@GetMapping("/{listName}")
	public ListOfItems getList(@PathVariable String listName) {
		return service.getList(listName);
	}
	@PutMapping("/addToList/{listName}/{item}")
	public void addToList(@PathVariable String item, @PathVariable String listName) {
		service.addToList(item, listName );
	}
	@DeleteMapping("/deleteFromList/{item}/{listName}")
	public void deleteFromList(@PathVariable String item, @PathVariable String listName) {
		service.deleteFromList(item, listName);
	}
	@DeleteMapping("/deleteList/{listName}")
	public void deleteList(@PathVariable String listName) {
		service.deleteList(listName);
	}
	@PutMapping("/setMarked/{item}/{listName}")
	public void setMarked(@PathVariable String item, @PathVariable String listName) {
		service.markItemComplete(listName, item);
	}
}
