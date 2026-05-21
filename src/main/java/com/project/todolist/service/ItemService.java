package com.project.todolist.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.todolist.domain.Item;


@Service
public interface ItemService {
	Item createItem(String item);
	Item getItem(String item);

	List<Item> allItems();
	void editItemName(String item, String originalItem);
	void deleteItem(String item);
	void markItem(String item);

}
