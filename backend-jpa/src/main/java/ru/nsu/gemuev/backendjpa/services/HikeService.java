package ru.nsu.gemuev.backendjpa.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;
import ru.nsu.gemuev.backendjpa.domain.Hike;
import ru.nsu.gemuev.backendjpa.dto.HikeDto;
import ru.nsu.gemuev.backendjpa.dto.requests.CreateHikeRequest;
import ru.nsu.gemuev.backendjpa.dto.requests.EditHikeRequest;
import ru.nsu.gemuev.backendjpa.mappers.HikeMapper;
import ru.nsu.gemuev.backendjpa.repositories.HikeRepository;
import ru.nsu.gemuev.backendjpa.utils.RequestFieldChecker;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class HikeService {
    private final HikeRepository hikeRepository;
    private final HikeMapper hikeMapper;
    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Transactional
    public @NonNull List<HikeDto> allHikes(){
        return StreamSupport
                .stream(hikeRepository.findAll().spliterator(), false)
                .map(hikeMapper::toDto)
                .toList();
    }

    @Transactional
    public @NonNull HikeDto getById(final long id){
        return hikeMapper.toDto(hikeRepository.findById(id).orElseThrow());
    }

    @Transactional
    public void createHike(@NonNull final CreateHikeRequest request){
        RequestFieldChecker.requireNonNull(request.getName());
        final var hike = new Hike();
        hike.setName(hike.getName());
        hikeRepository.save(hike);
    }

    @Transactional
    public void delete(final long id){
        jdbcTemplate.update("delete from hike_diary_records where hike_id=?", id, Long.class);
        jdbcTemplate.update("delete from tourists_hikes where hike_id=?", id, Long.class);
        jdbcTemplate.update("delete from hikes where id=?", id, Long.class);
    }

    @Transactional
    public void edit(@NonNull final EditHikeRequest request){
        final KeyHolder holder = new GeneratedKeyHolder();
        final SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("id", request.getId())
                .addValue("name", request.getName())
                .addValue("start_", request.getStart())
                .addValue("end_", request.getEnd())
                .addValue("route_id", request.getRouteId())
                .addValue("trainer_id", request.getTrainerId());

        namedParameterJdbcTemplate.update("update hikes set name=:name,route_id=:route_id," +
                        "trainer_id=:trainer_id,start_=:start_,end_=:end_ where id=:id",
                parameters, holder);

        jdbcTemplate.update("delete from tourists_hikes where hike_id=?", request.getId());

        jdbcTemplate.batchUpdate("insert into tourists_hikes (tourist_id, hike_id) values(?,?)",
                new BatchPreparedStatementSetter(){
                    @Override
                    public void setValues(@NotNull PreparedStatement ps, int i) throws SQLException {
                        final long touristId = request.getTouristIds().get(i);
                        ps.setLong(1, touristId);
                        ps.setLong(2, request.getId());
                    }

                    @Override
                    public int getBatchSize() {
                        return request.getTouristIds().size();
                    }
        });
    }
}
