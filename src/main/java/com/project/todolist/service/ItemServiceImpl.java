package com.project.todolist.service;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.project.todolist.domain.Item;
import com.project.todolist.repository.ItemRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service @RequiredArgsConstructor @Transactional @Slf4j
public class ItemServiceImpl  implements ItemService{
	private final ItemRepository repository;
	@Override
	public Item createItem(String item) {
		Item i = new Item(null, item, false);
		repository.save(i);
		return i;
	}

	@Override
	public List<Item> allItems() {
		return repository.findAll();
	}


	@Override
	public void editItemName(String item, String originalItem) {
			try {
				Item i = repository.findByItemName(originalItem);
				i.setItemName(item);
				repository.save(i);
			}
			catch(Exception e) {
				log.error(e.toString());
				System.out.println(e);
			}
	}

	@Override
	public void deleteItem(String  item) {
		Item i = repository.findByItemName(item);
				repository.delete(i);
	}

	@Override
	public void markItem(String item) {
		 Item i = repository.findByItemName(item);
		 i.setComplete(!i.isComplete());
		 repository.save(i);
	}

	@Override
	public Item getItem(String item) {
		Item i = null;
		try {
			i = repository.findByItemName(item);
		}
		catch(Exception e) {
			
		}
		return i;
	}


}
