package com.project.todolist.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.todolist.domain.Item;
import com.project.todolist.domain.ListOfItems;


@Service
public interface ItemService {
	Item createItem(String item, Long Id);
	Item getItem(Long id);

	List<Item> allItems();
	void editItem(Item item);
	void deleteItem(Long id);
	void markItem(Long id);

}
