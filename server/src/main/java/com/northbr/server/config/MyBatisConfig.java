package com.northbr.server.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

@MapperScan("com.northbr.server.mapper")
@Configuration
public class MyBatisConfig {

  @Bean
  public SqlSessionFactory getSqlSessionFactory(DataSource dataSource) throws Exception {
    SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
    sessionFactoryBean.setDataSource(dataSource);
    PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
    sessionFactoryBean.setMapperLocations(resolver.getResources("classpath:mapper/*.xml"));
    sessionFactoryBean.setTypeAliasesPackage("com.northbr.server.vo");
    return sessionFactoryBean.getObject();
  }

}
