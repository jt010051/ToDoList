package com.project.todolist.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.project.todolist.domain.Item;
import com.project.todolist.domain.ListOfItems;
import com.project.todolist.repository.ItemRepository;
import com.project.todolist.repository.ListRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service @RequiredArgsConstructor @Transactional @Slf4j
public class ItemServiceImpl  implements ItemService{
	private final ItemRepository repository;
	private final ListRepository listRepo;
	@Override
	public Item createItem(String item, Long id) {
		ListOfItems list = listRepo.findById(id).orElseThrow();
		Item i = new Item(null, item, false, list);
		repository.save(i);
	
		
		return i;
	}

	@Override
	public List<Item> allItems() {
		return repository.findAll();
	}


	@Override
	public void editItem(Item item) {
			try {
			
				repository.save(item);
			}
			catch(Exception e) {
				log.error(e.toString());
				System.out.println(e);
			}
	}

	@Override
	public void deleteItem(Long id) {
		Item item = repository.findById(id).orElseThrow();
				repository.delete(item);
	}

	@Override
	public void markItem(Long id) {
		Item item = repository.findById(id).orElseThrow();

		 item.setComplete(!item.isComplete());
		 
		 repository.save(item);
	}

	@Override
	public Item getItem(Long item) {
		Item i = null;
		try {
			i = repository.findById(item).orElseThrow();
		}
		catch(Exception e) {
			
		}
		return i;
	}


}
