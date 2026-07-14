package com.project.todolist.rest;

import java.util.List;

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
@RequestMapping("/lists")
@Slf4j 
@RequiredArgsConstructor
public class ListController {
public final ListService service;

	@PostMapping("/create/{thisList}")
	public ListOfItems createList(@PathVariable String thisList) {
		ListOfItems list = service.createList(thisList);	
		return list;
	}
	@GetMapping("/allLists")
	public List<ListOfItems> getAllLists(){
		return service.getAllLists();
	}

	@GetMapping("/{id}")
	public ListOfItems getList(@PathVariable Long id) {
		return service.getList(id);
	}
	

	@PutMapping("/edit")
	public void editlist(@RequestBody ListOfItems list) {
		service.editList(list);
			
	}


	@DeleteMapping("/deleteList/{id}")
	public void deleteList(@PathVariable Long id) {
		service.deleteList(id);
	}
	@PutMapping("/setMarked/{id}")
	public void setItemMarked(@PathVariable Long id) {
		service.markList(id);
	}
}
