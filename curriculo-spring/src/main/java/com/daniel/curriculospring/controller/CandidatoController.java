package com.daniel.curriculospring.controller;

import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daniel.curriculospring.model.CandidatoModel;
//import com.daniel.curriculospring.repository.CandidatoRepository;
import com.daniel.curriculospring.repository.CandidatoRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class CandidatoController {
    @Autowired
    private final CandidatoRepository candidatoRepository;
    

    /*
       @GetMapping("/candidato")
     * public List<CandidatoModel> list(){
     * var c1 = new CandidatoModel();
     * c1.setId(1L);
     * c1.setNome("Daniel");
     * c1.setEmail("Daniel@email");
     * c1.setEscolaridade("Incompleto");
     * 
     * var c2 = new CandidatoModel();
     * c2.setId(2L);
     * c2.setNome("Flavio");
     * c2.setEmail("flavio@email");
     * c2.setEscolaridade("Completo");
     * 
     * return Arrays.asList(c1, c2);
     * }
     */

    @GetMapping("/candidato")
    public List<CandidatoModel> listar() {
        return candidatoRepository.findAll();
    }
    @GetMapping("/candidato/cpf/{cpf}")
    public CandidatoModel buscar_cpf(@PathVariable String cpf) {
        return candidatoRepository.findByCpf(cpf).get(0);
    }
}
